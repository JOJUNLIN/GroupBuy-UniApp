/**
 * 添加拦截器:
 *   拦截 request 请求
 *   拦截 uploadFile 文件上传
 *
 * TODO:
 *   1. 非 http 开头需拼接地址
 *   2. 请求超时
 *   3. 添加小程序端请求头标识
 *   4. 添加 token 请求头标识
 */

import { useMemberStore } from '@/stores'

// 添加协议前缀
const baseURL = 'http://localhost:12345'

// 添加拦截器
const httpInterceptor = {
	// 拦截前触发
	invoke(options: UniApp.RequestOptions & { customToken?: string; noToken?: boolean }) {
	  // 1. 非 http 开头需拼接地址
	  if (!options.url.startsWith('http')) {
	    options.url = baseURL + options.url
	  }
	  // 2. 请求超时, 默认 60s
	  options.timeout = 10000
	  // 3. 添加小程序端请求头标识
	  options.header = {
	    ...options.header,
	    'source-client': 'miniapp',
	  }
	  // 4. 添加 token 请求头标识
	  // 如果设置了自定义 token，使用自定义 token
	  if (options.customToken) {
	    options.header.Authorization = options.customToken
	  } 
	  // 否则，如果没有设置 noToken 标志，使用存储中的 token
	  else if (!options.noToken) {
	    const memberStore = useMemberStore()
	    const token = memberStore.profile?.token
	    if (token) {
	      options.header.Authorization = token
	    }
	  }
	}
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

// 导出拦截器以使模块有效
// export default httpInterceptor

/**
 * 请求函数
 * @param  UniApp.RequestOptions
 * @returns Promise
 *  1. 返回 Promise 对象
 *  2. 获取数据成功
 *    2.1 提取核心数据 res.data
 *    2.2 添加类型，支持泛型
 *  3. 获取数据失败
 *    3.1 401错误  -> 清理用户信息，跳转到登录页
 *    3.2 其他错误 -> 根据后端错误信息轻提示
 *    3.3 网络错误 -> 提示用户换网络
 */
type Data<T> = {
	code : string
	msg : string
	result : T
}
// 2.2 添加类型，支持泛型
// 扩展请求选项类型
type CustomRequestOptions = UniApp.RequestOptions & {
	customToken ?: string;
	noToken ?: boolean;
}

// 修改 http 函数签名
export const http = <T>(options : CustomRequestOptions) => {
	// 1. 返回 Promise 对象
	return new Promise<Data<T>>((resolve, reject) => {
		uni.request({
			...options,
			header: {
				...options.header,
				// 如果提供了自定义 token，则使用它，否则保持原有逻辑
				...(options.customToken ? { Authorization: options.customToken } : {})
			},
			// 响应成功和失败的处理保持不变
			success(res) {
				// 保持原有逻辑不变
				if (res.statusCode >= 200 && res.statusCode < 300) {
					resolve(res.data as Data<T>)
				} else if (res.statusCode === 401) {
					const memberStore = useMemberStore()
					memberStore.clearProfile()
					uni.navigateTo({ url: '/pages/login/login' })
					reject(res)
				} else {
					uni.showToast({
						icon: 'none',
						title: (res.data as Data<T>).msg || '请求错误',
					})
					reject(res)
				}
			},
			fail(err) {
				uni.showToast({
					icon: 'none',
					title: '网络错误，换个网络试试',
				})
				reject(err)
			},
		})
	})
}
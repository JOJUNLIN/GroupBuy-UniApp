import type { LoginResult } from '@/types/member.d'
import { http } from '@/utils/http'

/**
 * 小程序登录_内测版
 * @param phoneNumber 模拟手机号码
 */
export const postLoginWxMinSimpleAPI = (phoneNumber : string) => {
	return http<LoginResult>({
		method: 'POST',
		url: '/user/login/wxMin/simple',
		data: {
			phoneNumber,
		},
	})
}

import type { CartItem } from '@/types/cart.d'
import { http } from '@/utils/http'
/**
 * 加入购物车
 * @param data 请求体参数
 */
export const postMemberCartAPI = (item: any) => {
  // 从Proxy对象中提取所需数据
  const data = {
    skuId: item._id,
    count: item.buy_num,
    goods_id: item.goods_id,
    goods_name: item.goods_name,
    image: item.image,
    price: item.price,
    sku_name: item.sku_name_arr, // 传递整个数组，服务端可以处理
    stock: item.stock,
	userId: item.userId // 添加userId到请求体
  }
  
  return http({
    method: 'POST',
    url: '/user/cart',
    data,
  })
}

/**
 * 获取购物车列表
 */
export const getMemberCartAPI = () => {
	return http<CartItem[]>({
		method: 'GET',
		url: '/user/cart',
	})
}

/**
 * 删除/清空购物车单品
 * @param data 请求体参数 ids SKUID 集合
 */
export const deleteMemberCartAPI = (data : { ids : string[] }) => {
	return http({
		method: 'DELETE',
		url: '/member/cart',
		data,
	})
}

/**
 * 修改购物车单品
 * @param skuId SKUID
 * @param data selected 选中状态 count 商品数量
 */
export const putMemberCartBySkuIdAPI = (
	skuId : string,
	data : { selected ?: boolean; count ?: number },
) => {
	return http({
		method: 'PUT',
		url: `/member/cart/${skuId}`,
		data,
	})
}

/**
 * 购物车全选/取消全选
 * @param data selected 是否选中
 */
export const putMemberCartSelectedAPI = (data : { selected : boolean }) => {
	return http({
		method: 'PUT',
		url: '/member/cart/selected',
		data,
	})
}
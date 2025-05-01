import type { OrderListResult } from '@/types/order.d'
import type {
	OrderCreateParams,
	OrderListParams,
	OrderPreResult,
	OrderResult,
} from '@/types/order.d'
import { http } from '@/utils/http'
/**
 * 填写订单-获取预付订单
 */
export const getMemberOrderPreAPI = () => {
	return http<OrderPreResult>({
		method: 'GET',
		url: '/user/order/pre',
	})
}

/**
 * 填写订单-获取立即购买订单-黑
 * @param data 请求数据
 * @param customToken 自定义 token（可选）
 */
export const getMemberOrderPreNowAPI = (
	data : {
		skuId : string
		count : string
		addressId ?: string
	},
	customToken ?: string
) => {
	return http<OrderPreResult>({
		method: 'GET',
		url: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/member/order/pre/now',
		data,
		customToken // 传递自定义 token
	})
}

/**
 * 提交订单
 * @param data 请求参数
 */
export const postMemberOrderAPI = (data : OrderCreateParams) => {
	return http<{ id : string }>({
		method: 'POST',
		url: '/user/order',
		data,
	})
}

/**
 * 获取订单详情
 * @param id 订单id
 */
export const getMemberOrderByIdAPI = (id : string) => {
	return http<OrderResult>({
		method: 'GET',
		url: `/user/order/${id}`,
	})
}

/**
 * 确认收货
 * @description 仅在订单状态为待收货时，可确认收货。
 * @param id 订单id
 */
export const putMemberOrderReceiptByIdAPI = (id : string) => {
	return http<OrderResult>({
		method: 'PUT',
		url: `/user/order/status/receive/${id}`,
	})
}


/**
 * 获取订单列表
 * @param data orderState 订单状态
 */
export const getMemberOrderAPI = (data : OrderListParams) => {
	return http<OrderListResult>({
		method: 'GET',
		url: `/user/order/list`,
		data,
	})
}
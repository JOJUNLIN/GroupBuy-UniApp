import { http } from '@/utils/http'

/**
 * 模拟支付-内测版
 * @param data orderId 订单id
 */
export const getPayMockAPI = ( orderId: string ) => {
  return http({
    method: 'PUT',
    url: `/user/order/status/pay/${orderId}`,
  })
}
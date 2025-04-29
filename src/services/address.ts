import type { AddressItem } from '@/types/address.d'
import { http } from '@/utils/http'

/**
 * 获取收货地址列表
 */
export const getMemberAddressAPI = () => {
  return http<AddressItem[]>({
    method: 'GET',
    url: '/user/address',
  })
}

import type { GoodsResult } from '@/types/goods.d'
import { http } from '@/utils/http'

/**
 * 商品详情
 * @param id 商品id
 */
export const getGoodsByIdAPI = (id: string) => {
  return http<GoodsResult>({
    method: 'GET',
    url: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/goods',
    data: { id },
	noToken: true, // 添加这个标识，表示不需要携带 token
  })
}

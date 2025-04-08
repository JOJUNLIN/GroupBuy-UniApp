/** 购物车类型 */
export type CartItem = {
	/** 购物车 ID */
	id: number
	/** 商品 ID */
	goodsId : string
	/** SKU ID */
	skuId : string
	/** 商品名称 */
	goodsName : string
	/** 图片 */
	image : string
	/** 数量 */
	count : number
	/** 加入时价格 */
	price : number
	/** 当前的价格 */
	// nowPrice : number
	/** 库存 */
	stock : number
	/** 是否选中 */
	selected : boolean
	/** 属性文字 */
	skuName : string
	/** 是否为有效商品 */
	// isEffective: boolean
}
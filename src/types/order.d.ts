import type { OrderState } from '@/services/constants'
import type { AddressItem } from './address'
import type { PageParams } from '@/types/global.d'

/** 获取预付订单 返回信息 */
export type OrderPreResult = {
	/** 商品集合 [ 商品信息 ] */
	goods : OrderPreGoods[]
	/** 结算信息 */
	summary : {
		/** 商品总价 */
		totalPrice : number
		/** 邮费 */
		postFee : number
		/** 应付金额 */
		totalPayPrice : number
	}
	/** 地址列表 [ 地址信息 ] */
	userAddresses : AddressItem[]
}

/** 商品信息 */
export type OrderPreGoods = {
	/** 属性文字，例如“颜色:瓷白色 尺寸：8寸” */
	skuName : string
	/** 数量 */
	count : number
	/** id */
	goodsId : string
	/** 商品名称 */
	goodsName : string
	/** 图片 */
	image : string
	/** 单价 */
	price : string
	/** SKUID */
	skuId : string
	/** 实付价格小计 */
	totalPayPrice : string
	/** 小计总价 */
	totalPrice : string
}

/** 提交订单 请求参数 */
export type OrderCreateParams = {
	/** 所选地址Id */
	addressId : number
	/** 商品集合[ 商品信息 ] */
	goods : {
		/** 属性文字，例如“颜色:瓷白色 尺寸：8寸” */
		skuName : string
		/** 数量 */
		count : number
		/** id */
		goodsId : string
		/** 商品名称 */
		goodsName : string
		/** 图片 */
		image : string
		/** 单价 */
		price : string
		/** SKUID */
		skuId : string
		/** 实付价格小计 */
		totalPayPrice : string
		/** 小计总价 */
		totalPrice : string
	}[]
	/** 商品总价 */
	totalPrice : number
	/** 邮费 */
	postFee : number
	/** 应付金额 */
	totalPayPrice : number
}

/** 提交订单 返回信息 */
export type OrderCreateResult = {
	/** 订单Id */
	id : string
}

/** 订单详情 返回信息 */
export type OrderResult = {
	/** 订单编号 */
	id : string
	/** 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消 */
	orderState : OrderState
	/** 商品集合 [ 商品信息 ] */
	skus : OrderSkuItem[]
	/** 下单时间 */
	createTime : string
	/** 商品总价 */
	totalMoney : number
	/** 运费 */
	postFee : number
	/** 应付金额 */
	payMoney : number
}

/** 商品信息 */
export type OrderSkuItem = {
	/** sku id */
	skuId : string
	/** 商品 id */
	goodsId : string
	/** 商品名称 */
	goodsName : string
	/** 商品属性文字 */
	skuName : string
	/** 数量 */
	count : number
	/** 购买时单价 */
	price : number
	/** 图片地址 */
	image : string
}

/** 物流信息 返回值类型 */
export type OrderLogisticResult = {
	/** 快递公司 */
	company : {
		/** 公司名称 */
		name : string
		/** 快递编号 */
		number : string
		/** 联系电话 */
		tel : string
	}
	/** 商品件数 */
	count : number
	/** 物流日志 */
	list : LogisticItem[]
}

/** 物流日志 */
export type LogisticItem = {
	/** 信息ID */
	id : string
	/** 信息文字 */
	text : string
	/** 时间 */
	time : string
}

/** 订单列表参数 */
export type OrderListParams = PageParams & { orderState : number }

/** 订单列表 */
export type OrderListResult = {
	/** 总记录数 */
	counts : number
	/** 数据集合    [ 订单信息 ] */
	items : OrderItem[]
	/** 当前页码 */
	page : number
	/** 总页数 */
	pages : number
	/** 页尺寸 */
	pageSize : number
}

/** 订单列表项 */
export type OrderItem = OrderResult & {
	/** 总件数 */
	totalNum : number
}
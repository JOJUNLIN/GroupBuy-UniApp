<script setup lang="ts">
	import {
		getMemberOrderPreAPI,
		getMemberOrderPreNowAPI,
		// getMemberOrderRepurchaseByIdAPI,
		postMemberOrderAPI,
	} from '@/services/order'
	import { useAddressStore } from '@/stores/modules/address'
	import type { OrderPreResult } from '@/types/order'
	import { onLoad } from '@dcloudio/uni-app'
	import { computed, ref } from 'vue'

	// 获取屏幕边界到安全区域距离
	const { safeAreaInsets } = uni.getSystemInfoSync()

	// 页面参数
	const query = defineProps<{
		skuId ?: string
		count ?: string
		// orderId ?: string
	}>()

	// 获取订单信息
	const orderPre = ref<OrderPreResult>()
	const getMemberOrderPreData = async () => {
		// 指定的 token
		const specificToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJuYW1lXCI6XCLnlKjmiLc0NTY3ODlcIixcImlkXCI6XCIxNzU4NDY3NjU1OTQ3MjU5OTA1XCIsXCJ1c2VybmFtZVwiOlwi55So5oi3MTgxMjM0NTY3ODlcIn0iLCJpYXQiOjE3NDY1NDA1NzUsImV4cCI6MTc0Njc5OTc3NX0.VcNMZMvdoCmzF8RxsZECjoZPkvUeX72qorx9wiCMQuk'

		if (query.count && query.skuId) {
			const res = await getMemberOrderPreNowAPI(
				{
					count: query.count,
					skuId: query.skuId,
				},
				specificToken // 指定的 token
			)

			// 转换接收到的商品数据格式
			if (res.result && res.result.goods) {
				res.result.goods = res.result.goods.map((item : any) => {
					return {
						skuName: item.attrsText,
						count: item.count,
						goodsId: item.id,
						goodsName: item.name,
						image: item.picture,
						// 将接收到的价格乘以100倍，以统一价格格式
						price: (parseFloat(item.payPrice) * 100).toString(),
						skuId: item.skuId,
						totalPayPrice: item.totalPayPrice,
						totalPrice: item.totalPrice
					}
				})
			}

			// 处理运费和总价
			if (res.result && res.result.summary) {
				// 记录原始运费
				const originalPostFee = res.result.summary.postFee

				// 固定运费为 5 元
				res.result.summary.postFee = 5

				// 重新计算总支付金额
				// 1. 先计算商品总价（不含运费）
				const goodsTotal = res.result.goods.reduce((sum, item) => {
					return sum + parseFloat(item.totalPayPrice)
				}, 0)

				// 2. 加上新的运费，得到最终总价
				res.result.summary.totalPayPrice = goodsTotal + 5

				// 如果商品总价需要保持一致
				res.result.summary.totalPrice = goodsTotal
			}

			orderPre.value = res.result
		} else {
			const res = await getMemberOrderPreAPI()
			orderPre.value = res.result
		}
	}

	onLoad(() => {
		getMemberOrderPreData()
	})

	const addressStore = useAddressStore()
	// 收货地址
	const selecteAddress = computed(() => {
		return addressStore.selectedAddress
	})

	// 提交订单
	const onOrderSubmit = async () => {
		// 没有收货地址提醒
		if (!selecteAddress.value?.id) {
			return uni.showToast({ icon: 'none', title: '请选择收货地址' })
		}
		// 发送请求
		const res = await postMemberOrderAPI({
			addressId: selecteAddress.value?.id,
			goods: orderPre.value!.goods.map((v) => ({
				skuName: v.skuName,
				count: v.count,
				goodsId: v.goodsId,
				goodsName: v.goodsName,
				image: v.image,
				price: v.price,  // 这边传过去的价格都是100倍数
				skuId: v.skuId,
				totalPayPrice: v.totalPayPrice,
				totalPrice: v.totalPrice
			})),
			totalPrice: orderPre.value!.summary.totalPrice,
			postFee: orderPre.value!.summary.postFee,
			totalPayPrice: orderPre.value!.summary.totalPayPrice
		})
		// 关闭当前页面，跳转到订单详情，传递订单id
		uni.redirectTo({ url: `/pagesOrder/detail/detail?id=${res.result.id}` })
	}
</script>

<template>
	<scroll-view enable-back-to-top scroll-y class="viewport">
		<!-- 收货地址 -->
		<navigator v-if="selecteAddress" class="shipment" hover-class="none"
			url="/pagesMember/address/address?from=order">
			<view class="address"> {{ selecteAddress.address }} </view>
			<text class="icon icon-right"></text>
		</navigator>
		<navigator v-else class="shipment" hover-class="none" url="/pagesMember/address/address?from=order">
			<view class="address"> 请选择拼团站点 </view>
			<text class="icon icon-right"></text>
		</navigator>

		<!-- 商品信息 -->
		<view class="goods">
			<navigator v-for="item in orderPre?.goods" :key="item.skuId" :url="`/pages/goods/goods?id=${item.goodsId}`"
				class="item" hover-class="none">
				<image class="picture" :src="item.image" />
				<view class="meta">
					<view class="name ellipsis"> {{ item.goodsName }} </view>
					<view class="attrs">{{ item.skuName }}</view>
					<view class="prices">
						<view class="pay-price symbol">{{ (item.price / 100).toFixed(2) }}</view>
						<!-- <view class="price symbol">{{ item.price }}</view> -->
					</view>
					<view class="count">x{{ item.count }}</view>
				</view>
			</navigator>
		</view>

		<!-- 支付金额 -->
		<view class="settlement">
			<view class="item">
				<text class="text">商品总价: </text>
				<text class="number symbol">{{ orderPre?.summary.totalPrice.toFixed(2) }}</text>
			</view>
			<view class="item">
				<text class="text">运费: </text>
				<text class="number symbol">{{ orderPre?.summary.postFee.toFixed(2) }}</text>
			</view>
		</view>

		<!-- 底部占位，防止内容被工具栏遮挡 -->
		<view class="toolbar-placeholder" :style="{ height: 100 + (safeAreaInsets?.bottom || 0) + 'px' }"></view>
	</scroll-view>

	<!-- 吸底工具栏 -->
	<view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
		<view class="total-pay symbol">
			<text class="number">{{ orderPre?.summary.totalPayPrice.toFixed(2) }}</text>
		</view>
		<view class="button" :class="{ disabled: !selecteAddress?.id }" @tap="onOrderSubmit">
			提交订单
		</view>
	</view>
</template>

<style lang="scss">
	page {
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
		background-color: #f4f4f4;
	}

	.viewport {
		flex: 1;
		overflow: hidden;
	}

	.symbol::before {
		content: '¥';
		font-size: 80%;
		margin-right: 5rpx;
	}

	.shipment {
		margin: 20rpx;
		padding: 30rpx 30rpx 30rpx 84rpx;
		font-size: 26rpx;
		border-radius: 10rpx;
		background: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png) 20rpx center / 50rpx no-repeat #fff;
		position: relative;

		.icon {
			font-size: 36rpx;
			color: #333;
			transform: translateY(-50%);
			position: absolute;
			top: 50%;
			right: 20rpx;
		}

		.user {
			color: #333;
			margin-bottom: 5rpx;
		}

		.address {
			color: #666;
		}
	}

	.goods {
		margin: 20rpx;
		padding: 0 20rpx;
		border-radius: 10rpx;
		background-color: #fff;

		.item {
			display: flex;
			padding: 30rpx 0;
			border-top: 1rpx solid #eee;

			&:first-child {
				border-top: none;
			}

			.picture {
				width: 170rpx;
				height: 170rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
			}

			.meta {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				position: relative;
			}

			.name {
				height: 80rpx;
				font-size: 26rpx;
				color: #444;
			}

			.attrs {
				line-height: 1.8;
				padding: 0 15rpx;
				margin-top: 6rpx;
				font-size: 24rpx;
				align-self: flex-start;
				border-radius: 4rpx;
				color: #888;
				background-color: #f7f7f8;
			}

			.prices {
				display: flex;
				align-items: baseline;
				margin-top: 6rpx;
				font-size: 28rpx;

				.pay-price {
					margin-right: 10rpx;
					color: #cf4444;
				}

				.price {
					font-size: 24rpx;
					color: #999;
					text-decoration: line-through;
				}
			}

			.count {
				position: absolute;
				bottom: 0;
				right: 0;
				font-size: 26rpx;
				color: #444;
			}
		}
	}

	.related {
		margin: 20rpx;
		padding: 0 20rpx;
		border-radius: 10rpx;
		background-color: #fff;

		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			min-height: 80rpx;
			font-size: 26rpx;
			color: #333;
		}

		.input {
			flex: 1;
			text-align: right;
			margin: 20rpx 0;
			padding-right: 20rpx;
			font-size: 26rpx;
			color: #999;
		}

		.item .text {
			width: 125rpx;
		}

		.picker {
			color: #666;
		}

		.picker::after {
			content: '\e6c2';
		}
	}

	/* 结算清单 */
	.settlement {
		margin: 20rpx;
		padding: 0 20rpx;
		border-radius: 10rpx;
		background-color: #fff;

		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 80rpx;
			font-size: 26rpx;
			color: #333;
		}

		.danger {
			color: #cf4444;
		}
	}

	/* 吸底工具栏 */
	.toolbar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: calc(var(--window-bottom));
		z-index: 1;

		background-color: #fff;
		height: 100rpx;
		padding: 0 20rpx;
		border-top: 1rpx solid #eaeaea;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: content-box;

		.total-pay {
			font-size: 40rpx;
			color: #cf4444;

			.decimal {
				font-size: 75%;
			}
		}

		.button {
			width: 220rpx;
			text-align: center;
			line-height: 72rpx;
			font-size: 26rpx;
			color: #fff;
			border-radius: 72rpx;
			background-color: #27ba9b;
		}

		.disabled {
			opacity: 0.6;
		}
	}

	/* 底部占位元素样式 */
	.toolbar-placeholder {
		box-sizing: content-box;
	}
</style>
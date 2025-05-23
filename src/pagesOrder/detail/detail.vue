<script setup lang="ts">
	import { useGuessList } from '@/composables'
	import { OrderState, orderStateList } from '@/services/constants'
	import {
		getMemberOrderByIdAPI,
		putMemberOrderReceiptByIdAPI,
	} from '@/services/order'
	import type { OrderResult } from '@/types/order'
	import { onLoad, onReady } from '@dcloudio/uni-app'
	import { ref } from 'vue'
	// import PageSkeleton from './components/PageSkeleton.vue'
	import { getPayMockAPI } from '@/services/pay'

	// 获取屏幕边界到安全区域距离
	const { safeAreaInsets } = uni.getSystemInfoSync()
	// 猜你喜欢
	const { guessRef, onScrolltolower } = useGuessList()
	// 复制内容
	const onCopy = (id : string) => {
		// 设置系统剪贴板的内容
		uni.setClipboardData({ data: id })
	}
	// 获取页面参数
	const query = defineProps<{
		id : string
	}>()

	// 获取页面栈
	const pages = getCurrentPages()

	// 基于小程序的 Page 类型扩展 uni-app 的 Page
	type PageInstance = Page.PageInstance & WechatMiniprogram.Page.InstanceMethods<any>

	// #ifdef MP-WEIXIN
	// 获取当前页面实例，数组最后一项
	const pageInstance = pages.at(-1) as PageInstance

	// 页面渲染完毕，绑定动画效果
	onReady(() => {
		// 动画效果,导航栏背景色
		pageInstance.animate(
			'.navbar',
			[{ backgroundColor: 'transparent' }, { backgroundColor: '#f8f8f8' }],
			1000,
			{
				scrollSource: '#scroller',
				timeRange: 1000,
				startScrollOffset: 0,
				endScrollOffset: 50,
			},
		)
		// 动画效果,导航栏标题
		pageInstance.animate('.navbar .title', [{ color: 'transparent' }, { color: '#000' }], 1000, {
			scrollSource: '#scroller',
			timeRange: 1000,
			startScrollOffset: 0,
			endScrollOffset: 50,
		})
		// 动画效果,导航栏返回按钮
		pageInstance.animate('.navbar .back', [{ color: '#fff' }, { color: '#000' }], 1000, {
			scrollSource: '#scroller',
			timeRange: 1000,
			startScrollOffset: 0,
			endScrollOffset: 50,
		})
	})
	// #endif

	// 获取订单详情
	const order = ref<OrderResult>()
	const getMemberOrderByIdData = async () => {
		const res = await getMemberOrderByIdAPI(query.id)
		order.value = res.result
	}

	onLoad(() => {
		getMemberOrderByIdData()
	})

	// 订单支付
	const onOrderPay = async () => {
		// 开发环境模拟支付
		await getPayMockAPI(query.id)

		// 关闭当前页，再跳转支付结果页
		uni.redirectTo({ url: `/pagesOrder/payment/payment?id=${query.id}` })
	}

	// 确认收货
	const onOrderConfirm = () => {
		// 二次确认弹窗
		uni.showModal({
			content: '为保障您的权益，请收到货并确认无误后，再确认收货',
			confirmColor: '#27BA9B',
			success: async (success) => {
				if (success.confirm) {
					const res = await putMemberOrderReceiptByIdAPI(query.id)
					// 更新订单状态
					order.value = res.result
				}
			},
		})
	}
	
</script>

<template>
	<!-- 自定义导航栏: 默认透明不可见, scroll-view 滚动到 50 时展示 -->
	<view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
		<view class="wrap">
			<navigator v-if="pages.length > 1" open-type="navigateBack" class="back icon-left"></navigator>
			<navigator v-else url="/pages/index/index" open-type="switchTab" class="back icon-home">
			</navigator>
			<view class="title">订单详情</view>
		</view>
	</view>
	<scroll-view enable-back-to-top scroll-y class="viewport" id="scroller" @scrolltolower="onScrolltolower">
		<template v-if="order">
			<!-- 订单状态 -->
			<view class="overview" :style="{ paddingTop: safeAreaInsets!.top + 20 + 'px' }">
				<!-- 待付款状态:展示倒计时 -->
				<template v-if="order.orderState === OrderState.DaiFuKuan">
					<view class="status icon-clock">等待付款</view>
					<view class="tips">
						<text class="money">应付金额: ¥ {{ order.payMoney }}</text>
					</view>
					<view class="button" @tap="onOrderPay">去支付</view>
				</template>
				<!-- 其他订单状态:展示再次购买按钮 -->
				<template v-else>
					<!-- 订单状态文字 -->
					<view class="status"> {{ orderStateList[order.orderState].text }} </view>
					<view class="button-group">
						<!-- 待收货状态: 展示确认收货按钮 -->
						<view v-if="order.orderState === OrderState.DaiShouHuo" @tap="onOrderConfirm" class="button">
							确认收货
						</view>
					</view>
				</template>
			</view>
			<!-- 用户收货地址 -->
			<view class="shipment">
				<view class="locate">
					<view class="address"> {{ order.address }} </view>
				</view>
			</view>

			<!-- 商品信息 -->
			<view class="goods">
				<view class="item">
					<navigator class="navigator" v-for="item in order.skus" :key="item.skuId"
						:url="`/pages/goods/goods?id=${item.goodsId}`" hover-class="none">
						<image class="cover" :src="item.image"></image>
						<view class="meta">
							<view class="name ellipsis">{{ item.goodsName }}</view>
							<view class="type">{{ item.skuName }}</view>
							<view class="price">
								<view class="actual">
									<text class="symbol">¥</text>
									<text>{{ (item.price / 100).toFixed(2) }}</text>
								</view>
							</view>
							<view class="quantity">x{{ item.count }}</view>
						</view>
					</navigator>
				</view>
				<!-- 合计 -->
				<view class="total">
					<view class="row">
						<view class="text">商品总价: </view>
						<view class="symbol">{{ order.totalMoney }}</view>
					</view>
					<view class="row">
						<view class="text">运费: </view>
						<view class="symbol">{{ order.postFee }}</view>
					</view>
					<view class="row">
						<view class="text">应付金额: </view>
						<view class="symbol primary">{{ order.payMoney }}</view>
					</view>
				</view>
			</view>

			<!-- 订单信息 -->
			<view class="detail">
				<view class="title">订单信息</view>
				<view class="row">
					<view class="item">
						订单编号: {{ query.id }} <text class="copy" @tap="onCopy(query.id)">复制</text>
					</view>
					<view class="item">下单时间: {{ order.createTime }}</view>
				</view>
			</view>

			<!-- 猜你喜欢 -->
			<GroupBuyGuess ref="guessRef" />

			<!-- 底部操作栏 -->
			<view class="toolbar-height" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }"></view>
			<view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
				<!-- 待付款状态:展示支付按钮 -->
				<template v-if="order.orderState === OrderState.DaiFuKuan">
					<view class="button primary" @tap="onOrderPay"> 去支付 </view>
				</template>
				<!-- 其他订单状态:按需展示按钮 -->
				<template v-else>
					<!-- 待收货状态: 展示确认收货 -->
					<view class="button primary" v-if="order.orderState === OrderState.DaiShouHuo"
						@tap="onOrderConfirm">
						确认收货
					</view>
				</template>
			</view>
		</template>
		<template v-else>
		</template>
	</scroll-view>
</template>

<style lang="scss">
	page {
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
	}

	.navbar {
		width: 750rpx;
		color: #000;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
		/* background-color: #f8f8f8; */
		background-color: transparent;

		.wrap {
			position: relative;

			.title {
				height: 44px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 32rpx;
				/* color: #000; */
				color: transparent;
			}

			.back {
				position: absolute;
				left: 0;
				height: 44px;
				width: 44px;
				font-size: 44rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				/* color: #000; */
				color: #fff;
			}
		}
	}

	.viewport {
		background-color: #f7f7f8;
	}

	.overview {
		display: flex;
		flex-direction: column;
		align-items: center;

		line-height: 1;
		padding-bottom: 30rpx;
		color: #fff;
		background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
		background-size: cover;

		.status {
			font-size: 36rpx;
		}

		.status::before {
			margin-right: 6rpx;
			font-weight: 500;
		}

		.tips {
			margin: 30rpx 0;
			display: flex;
			font-size: 14px;
			align-items: center;

			.money {
				margin-right: 30rpx;
			}
		}

		.button-group {
			margin-top: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.button {
			width: 260rpx;
			height: 64rpx;
			margin: 0 10rpx;
			text-align: center;
			line-height: 64rpx;
			font-size: 28rpx;
			color: #27ba9b;
			border-radius: 68rpx;
			background-color: #fff;
		}
	}

	.shipment {
		line-height: 1.4;
		padding: 0 20rpx;
		margin: 20rpx 20rpx 0;
		border-radius: 10rpx;
		background-color: #fff;

		.locate,
		.item {
			min-height: 120rpx;
			padding: 30rpx 30rpx 25rpx 75rpx;
			background-size: 50rpx;
			background-repeat: no-repeat;
			background-position: 6rpx center;
		}

		.locate {
			background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png);
			display: flex;
			align-items: center;/* 垂直居中 */

			.address {
				font-size: 24rpx;
				color: #666;
			}
		}

		.item {
			background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/car.png);
			border-bottom: 1rpx solid #eee;
			position: relative;

			.message {
				font-size: 26rpx;
				color: #444;
			}

			.date {
				font-size: 24rpx;
				color: #666;
			}
		}
	}

	.goods {
		margin: 20rpx 20rpx 0;
		padding: 0 20rpx;
		border-radius: 10rpx;
		background-color: #fff;

		.item {
			padding: 30rpx 0;
			border-bottom: 1rpx solid #eee;

			.navigator {
				display: flex;
				margin: 20rpx 0;
			}

			.cover {
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

			.type {
				line-height: 1.8;
				padding: 0 15rpx;
				margin-top: 6rpx;
				font-size: 24rpx;
				align-self: flex-start;
				border-radius: 4rpx;
				color: #888;
				background-color: #f7f7f8;
			}

			.price {
				display: flex;
				margin-top: 6rpx;
				font-size: 24rpx;
			}

			.symbol {
				font-size: 20rpx;
			}

			.original {
				color: #999;
				text-decoration: line-through;
			}

			.actual {
				margin-left: 10rpx;
				color: #444;
			}

			.text {
				font-size: 22rpx;
			}

			.quantity {
				position: absolute;
				bottom: 0;
				right: 0;
				font-size: 24rpx;
				color: #444;
			}

			.action {
				display: flex;
				flex-direction: row-reverse;
				justify-content: flex-start;
				padding: 30rpx 0 0;

				.button {
					width: 200rpx;
					height: 60rpx;
					text-align: center;
					justify-content: center;
					line-height: 60rpx;
					margin-left: 20rpx;
					border-radius: 60rpx;
					border: 1rpx solid #ccc;
					font-size: 26rpx;
					color: #444;
				}

				.primary {
					color: #27ba9b;
					border-color: #27ba9b;
				}
			}
		}

		.total {
			line-height: 1;
			font-size: 26rpx;
			padding: 20rpx 0;
			color: #666;

			.row {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 10rpx 0;
			}

			.symbol::before {
				content: '¥';
				font-size: 80%;
				margin-right: 3rpx;
			}

			.primary {
				color: #cf4444;
				font-size: 36rpx;
			}
		}
	}

	.detail {
		line-height: 1;
		padding: 30rpx 20rpx 0;
		margin: 20rpx 20rpx 0;
		font-size: 26rpx;
		color: #666;
		border-radius: 10rpx;
		background-color: #fff;

		.title {
			font-size: 30rpx;
			color: #444;
		}

		.row {
			padding: 20rpx 0;

			.item {
				padding: 10rpx 0;
				display: flex;
				align-items: center;
			}

			.copy {
				border-radius: 20rpx;
				font-size: 20rpx;
				border: 1px solid #ccc;
				padding: 5rpx 10rpx;
				margin-left: 10rpx;
			}
		}
	}

	.toolbar-height {
		height: 100rpx;
		box-sizing: content-box;
	}

	.toolbar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: calc(var(--window-bottom));
		z-index: 1;

		height: 100rpx;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
		flex-direction: row-reverse;
		border-top: 1rpx solid #ededed;
		border-bottom: 1rpx solid #ededed;
		background-color: #fff;
		box-sizing: content-box;

		.button {
			display: flex;
			justify-content: center;
			align-items: center;

			width: 200rpx;
			height: 72rpx;
			margin-left: 15rpx;
			font-size: 26rpx;
			border-radius: 72rpx;
			border: 1rpx solid #ccc;
			color: #444;
		}

		.delete {
			order: 4;
			color: #cf4444;
		}

		.button {
			order: 3;
		}

		.secondary {
			order: 2;
			color: #27ba9b;
			border-color: #27ba9b;
		}

		.primary {
			order: 1;
			color: #fff;
			background-color: #27ba9b;
		}
	}

	.popup-root {
		padding: 30rpx 30rpx 0;
		border-radius: 10rpx 10rpx 0 0;
		overflow: hidden;

		.title {
			font-size: 30rpx;
			text-align: center;
			margin-bottom: 30rpx;
		}

		.description {
			font-size: 28rpx;
			padding: 0 20rpx;

			.tips {
				color: #444;
				margin-bottom: 12rpx;
			}

			.cell {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 15rpx 0;
				color: #666;
			}

			.icon::before {
				content: '\e6cd';
				font-family: 'erabbit' !important;
				font-size: 38rpx;
				color: #999;
			}

			.icon.checked::before {
				content: '\e6cc';
				font-size: 38rpx;
				color: #27ba9b;
			}
		}

		.footer {
			display: flex;
			justify-content: space-between;
			padding: 30rpx 0 40rpx;
			font-size: 28rpx;
			color: #444;

			.button {
				flex: 1;
				height: 72rpx;
				text-align: center;
				line-height: 72rpx;
				margin: 0 20rpx;
				color: #444;
				border-radius: 72rpx;
				border: 1rpx solid #ccc;
			}

			.primary {
				color: #fff;
				background-color: #27ba9b;
				border: none;
			}
		}
	}
</style>
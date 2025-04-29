<script setup lang="ts">
	import { getMemberAddressAPI } from '@/services/address'
	import { useAddressStore } from '@/stores/modules/address'
	import type { AddressItem } from '@/types/address.d'
	import { onShow } from '@dcloudio/uni-app'
	import { ref } from 'vue'

	// 获取收货地址列表数据
	const addressList = ref<AddressItem[]>([])
	const getMemberAddressData = async () => {
		const res = await getMemberAddressAPI()
		addressList.value = res.result
	}

	// 初始化调用(页面显示)
	onShow(() => {
		getMemberAddressData()
	})
	
	// 修改收货地址
	const onChangeAddress = (item: AddressItem) => {
	  // 修改地址
	  const addressStore = useAddressStore()
	  addressStore.changeSelectedAddress(item)
	  // 返回上一页
	  uni.navigateBack()
	}

</script>

<template>
	<view class="viewport">
		<!-- 地址列表 -->
		<scroll-view enable-back-to-top class="scroll-view" scroll-y>
			<view v-if="addressList.length" class="address">
				<uni-swipe-action class="address-list">
					<!-- 收货地址项 -->
					<uni-swipe-action-item class="item" v-for="item in addressList" :key="item.id">
						<view class="item-content" @tap="onChangeAddress(item)">
							<view class="locate">{{ item.address }}</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			<view v-else class="blank">暂无收货地址</view>
		</scroll-view>
	</view>
</template>

<style lang="scss">
	page {
		height: 100%;
		overflow: hidden;
	}

	.viewport {
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: #f4f4f4;

		.scroll-view {
			padding-top: 20rpx;
		}
	}

	.address {
		padding: 0 20rpx;
		margin: 0 20rpx;
		border-radius: 10rpx;
		background-color: #fff;

		.item-content {
			line-height: 1;
			padding: 40rpx 10rpx 38rpx;
			border-bottom: 1rpx solid #ddd;
			position: relative;

		}

		.item:last-child .item-content {
			border: none;
		}

		.user {
			font-size: 28rpx;
			margin-bottom: 20rpx;
			color: #333;
		}

		.locate {
			line-height: 1.6;
			font-size: 26rpx;
			color: #333;
		}
	}

	.blank {
		margin-top: 300rpx;
		text-align: center;
		font-size: 32rpx;
		color: #888;
	}

</style>
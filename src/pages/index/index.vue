<script setup lang="ts">
	import { ref } from 'vue'
	import CustomNavbar from './components/CustomNavbar.vue'
	import CategoryPanel from './components/CategoryPanel.vue'
	import HotPanel from './components/HotPanel.vue'
	import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
	import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
	import { onLoad } from '@dcloudio/uni-app'
	import { useGuessList } from '@/composables'
	import PageSkeleton from './components/PageSkeleton.vue'

	// 获取轮播图数据
	const bannerList = ref<BannerItem[]>([])
	// const getHomeBannerData = async () => {
	// 	const res = await getHomeBannerAPI()
	// 	bannerList.value = res.data
	// }
	const getHomeBannerData = async () => {
		try {
			const res = await getHomeBannerAPI()
			// console.log('API 响应:', res) // 输出完整响应

			if (res.result) {
				bannerList.value = res.result
				// console.log('Banner 数据设置成功:', bannerList.value)
			} else {
				console.error('响应中没有 result 或 data 字段')
			}
		} catch (error) {
			console.error('获取轮播图数据失败:', error)
		}
	}
	
	// 获取前台分类数据
	const categoryList = ref<CategoryItem[]>([])
	const getHomeCategoryData = async () => {
		const res = await getHomeCategoryAPI()
		categoryList.value = res.result
	}
	
	// 获取热门推荐数据
	const hotList = ref<HotItem[]>([])
	const getHomeHotData = async () => {
		const res = await getHomeHotAPI()
		hotList.value = res.result
	}
	
	// 是否加载中标记
	const isLoading = ref(false)

	// 页面加载
	onLoad(async () => {
		isLoading.value = true
		await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
		isLoading.value = false
	})
	
	// 猜你喜欢组合式函数调用
	const { guessRef, onScrolltolower } = useGuessList()
	// 当前下拉刷新状态
	const isTriggered = ref(false)
	// 自定义下拉刷新被触发
	const onRefresherrefresh = async () => {
		// 开始动画
		isTriggered.value = true
		// 加载数据
		// await getHomeBannerData()
		// await getHomeCategoryData()
		// await getHomeHotData()
		// 重置猜你喜欢组件数据
		guessRef.value?.resetData()
		await Promise.all([
			getHomeBannerData(),
			getHomeCategoryData(),
			getHomeHotData(),
			guessRef.value?.getMore(),
		])
		// 关闭动画
		isTriggered.value = false
	}
</script>

<template>
	<!-- 自定义导航栏 -->
	<CustomNavbar />
	<!-- 滚动容器 -->
	<scroll-view 
		enable-back-to-top 
		refresher-enabled 
		@refresherrefresh="onRefresherrefresh"
		:refresher-triggered="isTriggered" 
		@scrolltolower="onScrolltolower" 
		class="scroll-view" 
		scroll-y
	>
		<PageSkeleton v-if="isLoading" />
		<template v-else>
			<!-- 自定义轮播图 -->
			<GroupBuySwiper :list="bannerList" />
			<!-- 分类面板 -->
			<CategoryPanel :list="categoryList" />
			<!-- 热门推荐 -->
			<HotPanel :list="hotList" />
			<!-- 猜你喜欢 -->
			<GroupBuyGuess ref="guessRef" />
		</template>
	</scroll-view>
	
</template>

<style lang="scss">
	page {
		background-color: #f7f7f7;
		height: 100%;
		overflow: hidden;
	}
	
	.viewport {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.scroll-view {
		flex: 1;
		overflow: hidden;
	}
</style>
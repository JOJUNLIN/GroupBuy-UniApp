<script setup lang="ts">
	import { postLoginWxMinSimpleAPI } from '@/services/login'
	import { useMemberStore } from '@/stores'
	import type { LoginResult } from '@/types/member.d'
	import { onLoad } from '@dcloudio/uni-app'
	import { ref } from 'vue'

	// #ifdef MP-WEIXIN
	// 获取 code 登录凭证
	let code = ''
	onLoad(async () => {
		const res = await wx.login()
		code = res.code
	})

	// 模拟手机号码快捷登录（个人开发）
	const onGetphonenumberSimple = async () => {
		const res = await postLoginWxMinSimpleAPI('12123456789')
		loginSuccess(res.result)
	}
	// #endif

	const loginSuccess = (profile : LoginResult) => {
		// 保存会员信息
		const memberStore = useMemberStore()
		memberStore.setProfile(profile)
		// 成功提示
		uni.showToast({ icon: 'success', title: '登录成功' })
		setTimeout(() => {
			uni.navigateBack()
		}, 500)
	}

</script>

<template>
	<view class="viewport">
		<view class="logo">
			<image src="@/static/images/logo_icon.png"></image>
		</view>
		<view class="login">
			<!-- 小程序端授权登录 -->
			<!-- #ifdef MP-WEIXIN -->
			<button class="button phone" @tap="onGetphonenumberSimple">
				<text class="icon icon-phone"></text>
				手机号快捷登录
			</button>
			<!-- #endif -->
			<view class="extra">
				<view class="caption">
					<text>登录方式</text>
				</view>
				<view class="options">
				</view>
			</view>
			<view class="tips">登录/注册即视为你同意《服务条款》和《隐私协议》</view>
		</view>
	</view>
</template>

<style lang="scss">
	page {
		height: 100%;
	}

	.viewport {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 20rpx 40rpx;
	}

	.logo {
		flex: 1;
		text-align: center;

		image {
			width: 332rpx;
			height: 80rpx;
			margin-top: 15vh;
		}
	}

	.login {
		display: flex;
		flex-direction: column;
		height: 60vh;
		padding: 40rpx 20rpx 20rpx;

		.input {
			width: 100%;
			height: 80rpx;
			font-size: 28rpx;
			border-radius: 72rpx;
			border: 1px solid #ddd;
			padding-left: 30rpx;
			margin-bottom: 20rpx;
		}

		.button {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 80rpx;
			font-size: 28rpx;
			border-radius: 72rpx;
			color: #fff;

			.icon {
				font-size: 40rpx;
				margin-right: 6rpx;
			}
		}

		.phone {
			background-color: #28bb9c;
		}

		.wechat {
			background-color: #06c05f;
		}

		.extra {
			flex: 1;
			padding: 70rpx 70rpx 0;

			.caption {
				width: 440rpx;
				line-height: 1;
				border-top: 1rpx solid #ddd;
				font-size: 26rpx;
				color: #999;
				position: relative;

				text {
					transform: translate(-40%);
					background-color: #fff;
					position: absolute;
					top: -12rpx;
					left: 50%;
				}
			}

			.options {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 70rpx;

				button {
					padding: 0;
					background-color: transparent;

					&::after {
						border: none;
					}
				}
			}

			.icon {
				font-size: 24rpx;
				color: #444;
				display: flex;
				flex-direction: column;
				align-items: center;

				&::before {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 80rpx;
					height: 80rpx;
					margin-bottom: 6rpx;
					font-size: 40rpx;
					border: 1rpx solid #444;
					border-radius: 50%;
				}
			}

			.icon-weixin::before {
				border-color: #06c05f;
				color: #06c05f;
			}
		}
	}

	.tips {
		position: absolute;
		bottom: 80rpx;
		left: 20rpx;
		right: 20rpx;
		font-size: 22rpx;
		color: #999;
		text-align: center;
	}
</style>
<template name="skeleton">
  <view class="sk-container">
    <scroll-view enable-back-to-top="true" refresher-enabled="true" scroll-y="true" class="scroll-view scroll-view">
      <view is="components/GroupBuySwiper">
        <view class="carousel GroupBuySwiper--carousel">
          <swiper :circular="true" :interval="3000" :current="0" :autoplay="false">
            <swiper-item style="position: absolute; width: 100%; height: 100%; transform: translate(0%, 0px) translateZ(0px);">
              <navigator class="navigator GroupBuySwiper--navigator" hover-class="none">
                <image class="image GroupBuySwiper--image sk-image" mode="aspectFill"></image>
              </navigator>
            </swiper-item>
          </swiper>
          <view class="indicator GroupBuySwiper--indicator">
            <text class="dot GroupBuySwiper--dot active GroupBuySwiper--active"></text>
            <text class="dot GroupBuySwiper--dot"></text>
            <text class="dot GroupBuySwiper--dot"></text>
            <text class="dot GroupBuySwiper--dot"></text>
            <text class="dot GroupBuySwiper--dot"></text>
          </view>
        </view>
      </view>
      <view is="pages/index/components/CategoryPanel">
        <view class="category CategoryPanel--category">
          <navigator class="category-item CategoryPanel--category-item" hover-class="none">
            <image class="icon CategoryPanel--icon sk-image"></image>
            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-160 sk-text">居家</text>
          </navigator>
          <navigator class="category-item CategoryPanel--category-item" hover-class="none">
            <image class="icon CategoryPanel--icon sk-image"></image>
            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-276 sk-text">锦鲤</text>
          </navigator>
          <navigator class="category-item CategoryPanel--category-item" hover-class="none">
            <image class="icon CategoryPanel--icon sk-image"></image>
            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-910 sk-text">服饰</text>
          </navigator>
          <navigator class="category-item CategoryPanel--category-item" hover-class="none">
            <image class="icon CategoryPanel--icon sk-image"></image>
            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-822 sk-text">母婴</text>
          </navigator>
          <navigator class="category-item CategoryPanel--category-item" hover-class="none">
            <image class="icon CategoryPanel--icon sk-image"></image>
            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-839 sk-text">个护</text>
          </navigator>
          <navigator class="category-item CategoryPanel--category-item" hover-class="none">
            <image class="icon CategoryPanel--icon sk-image"></image>
            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-160 sk-text">严选</text>
          </navigator>
          <navigator class="category-item CategoryPanel--category-item" hover-class="none">
            <image class="icon CategoryPanel--icon sk-image"></image>
            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-224 sk-text">数码</text>
          </navigator>
          <navigator class="category-item CategoryPanel--category-item" hover-class="none">
            <image class="icon CategoryPanel--icon sk-image"></image>
            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-685 sk-text">运动</text>
          </navigator>
          <navigator class="category-item CategoryPanel--category-item" hover-class="none">
            <image class="icon CategoryPanel--icon sk-image"></image>
            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-532 sk-text">杂项</text>
          </navigator>
          <navigator class="category-item CategoryPanel--category-item" hover-class="none">
            <image class="icon CategoryPanel--icon sk-image"></image>
            <text class="text CategoryPanel--text sk-transparent sk-text-14-2857-695 sk-text">品牌</text>
          </navigator>
        </view>
      </view>
      <view is="pages/index/components/HotPanel">
        <view class="panel HotPanel--panel hot HotPanel--hot">
          <view class="item HotPanel--item">
            <view class="title HotPanel--title">
              <text class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-692 sk-text">特惠推荐</text>
              <text class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-409 sk-text">它们最实惠</text>
            </view>
            <navigator class="cards HotPanel--cards" hover-class="none">
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
            </navigator>
          </view>
          <view class="item HotPanel--item">
            <view class="title HotPanel--title">
              <text class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-989 sk-text">爆款推荐</text>
              <text class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-284 sk-text">它们最受欢迎</text>
            </view>
            <navigator class="cards HotPanel--cards" hover-class="none">
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
            </navigator>
          </view>
          <view class="item HotPanel--item">
            <view class="title HotPanel--title">
              <text class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-279 sk-text">一站买全</text>
              <text class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-626 sk-text">精心优选</text>
            </view>
            <navigator class="cards HotPanel--cards" hover-class="none">
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
            </navigator>
          </view>
          <view class="item HotPanel--item">
            <view class="title HotPanel--title">
              <text class="title-text HotPanel--title-text sk-transparent sk-text-14-2857-558 sk-text">领券中心</text>
              <text class="title-desc HotPanel--title-desc sk-transparent sk-text-14-2857-302 sk-text">超值优惠券</text>
            </view>
            <navigator class="cards HotPanel--cards" hover-class="none">
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
              <image class="image HotPanel--image sk-image" mode="aspectFit"></image>
            </navigator>
          </view>
        </view>
      </view>
      <view is="components/GroupBuyGuess" class="r r">
        <view class="caption GroupBuyGuess--caption">
          <text class="text GroupBuyGuess--text sk-transparent sk-text-0-0000-827 sk-text sk-pseudo sk-pseudo-circle">猜你喜欢</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style>
	.sk-transparent {
	    color: transparent !important;
	  }
	.sk-text-6-2500-402 {
	    background-image: linear-gradient(transparent 6.2500%, #EEEEEE 0%, #EEEEEE 93.7500%, transparent 0%) !important;
	    background-size: 100% 27.9070rpx;
	    position: relative !important;
	  }
	.sk-text {
	    background-origin: content-box !important;
	    background-clip: content-box !important;
	    background-color: transparent !important;
	    color: transparent !important;
	    background-repeat: repeat-y !important;
	  }
	.sk-text-14-2857-275 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 39.0698rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-160 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 34.1860rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-276 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 34.1860rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-910 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 34.1860rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-822 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 34.1860rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-839 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 34.1860rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-224 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 34.1860rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-685 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 34.1860rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-532 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 34.1860rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-695 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 34.1860rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-692 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 43.9535rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-409 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 31.7442rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-989 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 43.9535rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-284 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 31.7442rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-279 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 43.9535rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-626 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 31.7442rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-558 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 43.9535rpx;
	    position: relative !important;
	  }
	.sk-text-14-2857-302 {
	    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
	    background-size: 100% 31.7442rpx;
	    position: relative !important;
	  }
	.sk-text-0-0000-827 {
	    background-image: linear-gradient(transparent 0.0000%, #EEEEEE 0%, #EEEEEE 100.0000%, transparent 0%) !important;
	    background-size: 100% 31.3953rpx;
	    position: relative !important;
	  }
	.sk-image {
	    background: #EFEFEF !important;
	  }
	.sk-pseudo::before, .sk-pseudo::after {
	      background: #EFEFEF !important;
	      background-image: none !important;
	      color: transparent !important;
	      border-color: transparent !important;
	    }
	.sk-pseudo-rect::before, .sk-pseudo-rect::after {
	      border-radius: 0 !important;
	    }
	.sk-pseudo-circle::before, .sk-pseudo-circle::after {
	      border-radius: 50% !important;
	    }
	.sk-container {
	    position: absolute;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
	    overflow: hidden;
	    background-color: transparent;
	  }

</style>
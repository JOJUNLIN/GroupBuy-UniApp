import GroupBuySwiper from '@/components/GroupBuySwiper.vue'
import GroupBuyGuess from '@/components/GroupBuyGuess.vue'

declare module 'vue' {
  export interface GlobalComponents {
    GroupBuySwiper: typeof GroupBuySwiper
    GroupBuyGuess: typeof GroupBuyGuess
  }
}

// 组件实例类型
export type GroupBuyGuessInstance = InstanceType<typeof GroupBuyGuess>
export type GroupBuySwiperInstance = InstanceType<typeof GroupBuySwiper>

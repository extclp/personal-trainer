<template>
  <view
    class="location ml-4 flex items-center" :style="{ marginTop: `${menuButton.top}px`, height: `${menuButton.height}px` }"
    @click="visible = true"
  >
    <image class="h-5 w-5" src="@/static/icons/location.svg" />
    <text class="ml-2">{{ location }}</text>
  </view>

  <sar-popout v-model:visible="visible" title="选择区域">
    <PickerInput v-model="location" :columns="data?.search_list.teachingPosition" />
  </sar-popout>
</template>

<script setup lang="ts">
import PickerInput from './PickerInput.vue'
import { bigData } from '@/store'

let menuButton = {
  bottom: 83,
  height: 32,
  left: 296,
  right: 383,
  top: 51,
  width: 87,
}
// #ifdef MP-WEIXIN
menuButton = uni.getMenuButtonBoundingClientRect()
// #endif

const visible = ref(false)

const location = ref(uni.getStorageSync('location'))

watch(location, () => {
  uni.setStorageSync('location', location.value)
})

const data = bigData()
watch(data, (value) => {
  if (!location.value) {
    location.value = value!.search_list.teachingPosition[0]
  }
})
</script>

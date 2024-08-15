<template>
  <view
    class="location ml-4 flex items-center"
    :style="{ marginTop: `${menuButton.top}px`, height: `${menuButton.height}px` }" @click="visible = true"
  >
    <image class="h-5 w-5" src="@/static/icons/location.svg" />
    <text class="ml-2">{{ location[0] }}</text>
  </view>

  <nut-popup v-model:visible="visible" position="bottom" safe-area-inset-bottom>
    <nut-picker
      v-model="location" :columns="makeTV(data?.search_list.teachingPosition)" title="选择位置"
      @cancel="visible = false" @confirm="visible = false"
    />
  </nut-popup>
</template>

<script setup lang="ts">
import { makeTV } from '@/utls'
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

const location = ref([uni.getStorageSync('location')])

watch(location, () => {
  uni.setStorageSync('location', location.value[0])
})

const data = bigData()
watch(data, (value) => {
  if (!location.value) {
    location.value = [value!.search_list.teachingPosition[0]]
  }
})
</script>

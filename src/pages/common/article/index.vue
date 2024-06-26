<template>
  <view v-if="data" class="grid grid grid-cols-2 gap-3 p-3">
    <view v-for="item in data" :key="item.name" class="relative inline-block h-50 w-auto rounded-10 text-white">
      <image class="h-full w-full" src="@/static/image/home/new-bg.png" />
      <view class="absolute left-4 top-4 text-5 font-bold">{{ item.title }}</view>
      <view class="absolute top-40 whitespace-normal px-4 font-black">{{ item.name }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { news } from '@/api'
import type { New } from '@/api/interfaces'

const data = ref<New[]>()

news().then((resp) => {
  data.value = resp.data
})
</script>

<template>
  <view v-if="data" class="grid grid grid-cols-2 gap-3 p-3">
    <view v-for="item in data" :key="item.titles" class="relative inline-block h-50 w-auto  rounded-10 text-white"
      @click="list(item.titles)">
      <image class="absolute h-full w-full" :src="item.image" />
      <view class="size-full center relative z-100">
        {{ item.titles }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { articleCatlog } from '@/api'
import type { ArticleCatlog } from '@/api/interfaces'

const data = ref<ArticleCatlog[]>()

articleCatlog().then((resp) => {
  data.value = resp.data.titles
})

function list(title: string) {
  uni.navigateTo({ url: `/pages/article/list?tag=${title}` })
}
</script>

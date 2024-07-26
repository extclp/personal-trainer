<template>
  <view v-if="data" class="p-4 pb-12">
    <image class="h-45 w-full rounded-1" :src="data.image" mode="aspectFill" />
    <view class="mt-4 text-2xl font-500">{{ data.name }}</view>

    <view class="my-4 flex items-center gap-2 text-lg">
      <image class="size-10 rounded-full" :src="data.writer_image" />
      <view>{{ data.writer }}</view>
      <view class="ml-auto text-sm">{{ ago(data.time) }}</view>
    </view>

    <view class="whitespace-pre-wrap">{{ data.content }}</view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { article } from '@/api'
import type { ArticleDetail } from '@/api/interfaces'
import { ago } from '@/utls'

const data = ref<ArticleDetail>()

onLoad((query) => {
  article(query!).then((resp) => {
    data.value = resp.data
  })
})
</script>

<style>
page {
  background: white;
}
</style>

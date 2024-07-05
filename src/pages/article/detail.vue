<template>
  <view v-if="data" class="p-4">
    <view class="mt-4 text-2xl font-500">{{ data.name }}</view>

    <view class="my-4 flex items-center gap-2 text-lg">
      <nut-avatar :src="data.writer_image" />
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

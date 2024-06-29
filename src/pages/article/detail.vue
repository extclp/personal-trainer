<template>
  <view v-if="data" class="p-4">
    <view class="mb-6 flex items-center gap-2">
      <nut-avatar :src="data.image" />
      <view>{{ data.writer }}</view>
      <view class="ml-auto">{{ ago(data.time) }}</view>
    </view>
    <view class="my-4 font-600">{{ data.name }}</view>
    <view>{{ data.content }}</view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { article } from '@/api'
import type { Article } from '@/api/interfaces'
import { ago } from '@/utls'

const data = ref<Article>()

onLoad((query) => {
  article(query!).then((resp) => {
    data.value = resp.data
  })
})
</script>

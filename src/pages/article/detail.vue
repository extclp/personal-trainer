<template>
  <view v-if="data" class="p-4 pb-12">
    <image class="h-45 w-full rounded-1" :src="data.image" mode="aspectFill" />
    <view class="mt-4 text-2xl font-500">{{ data.name }}</view>

    <view class="my-4 flex items-center gap-2 text-lg">
      <image class="size-15 rounded-full" :src="data.writer_image" mode="aspectFill" />
      <View>
        <view>{{ data.writer }}</view>
        <view class="ml-auto text-sm">{{ ago(data.time) }}</view>
      </View>
      <view class="mb-2 ml-a">
        <image v-if="data.like" class="size-6" src="@/static/icons/favorite-solid.svg" @click="updateLike" />
        <image v-else class="size-6" src="@/static/icons/favorite-line.svg" @click="updateLike" />
      </view>
    </view>

    <view class="whitespace-pre-wrap">{{ data.content }}</view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { article, articleLike } from '@/api'
import type { ArticleDetail } from '@/api/interfaces'
import { ago } from '@/utls'

const data = ref<ArticleDetail>()

let name: string

onLoad((query) => {
  name = query!.name
  article(query!).then((resp) => {
    data.value = resp.data
  })
})

function updateLike() {
  data.value!.like = !data.value!.like
  articleLike({
    name,
    phone: uni.getStorageSync('phone'),
  })
}
</script>

<style>
page {
  background: white;
}
</style>

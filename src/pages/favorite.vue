<template>
  <view class="m-4 text-lg">教师收藏</view>
  <sar-card v-for="item in data?.trechers" class="m4">
    <view class="flex gap-2">
      <view class="text-center">
        <nut-avatar class="mb-2" :size="70" />
        <view class="text-xs text-[#AAA6B9]">最近登录</view>
        <view class="mt-1 text-xs text-[#AAA6B9]">{{ item.login_time }}</view>
      </view>
      <view class="flex-1">
        <text class="float-right text-primary">{{ item.cost }}</text>
        <text>{{ item.name }}</text>
        <nut-tag type="primary" class="ml2">{{ item.identity }}</nut-tag>
        <view class="mt-6">
          <text class="w-8 text-primary">科目：</text>
          <text>初中数学</text>
        </view>
        <view class="mt-2">
          <text class="w-8 text-primary">地区：</text>
          <text>崇川区</text>
        </view>
      </view>
    </view>
    <view class="mt-2 flex gap-2">
      <nut-tag type="primary">{{ item.college }}</nut-tag>
      <nut-tag type="primary">数学师范 研究生</nut-tag>
    </view>
  </sar-card>
  <view class="m-4 text-lg">文章收藏</view>
  <navigator
    v-for="item in data?.articles" :key="item.title"
    :url="`/pages/article/detail?type=kopp&name=${item.title}`"
  >
    <sar-card class="m-4">
      <view class="flex gap-2">
        <image class="size-20 shrink-0" :src="item.image" />
        <view class="overflow-hidden">
          <view class="my-3 truncate font-600">{{ item.article }}</view>
          <view class="mt-2">{{ item.title }}</view>
        </view>
      </view>
    </sar-card>
  </navigator>
</template>

<script setup lang="ts">
import { collect } from '@/api'
import type { Collect } from '@/api/interfaces'

const data = ref<Collect>()

collect({ per_page: 1000, number: 1 }).then((resp) => {
  data.value = resp.data
})
</script>

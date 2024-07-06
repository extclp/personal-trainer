<template>
  <view class="m-4 text-lg">教师收藏</view>
  <navigator v-for="item in data?.trechers" :key="item.phone" :url="`/pages/teacher/detail?phone=${item.phone}`">
    <sar-card class="m4">
      <view class="flex gap-2">
        <view class="text-center">
          <nut-avatar class="mb-2" :size="70" :src="item.image" />
          <view class="text-xs text-[#AAA6B9]">最近登录</view>
          <view class="mt-1 text-xs text-[#AAA6B9]">{{ item.login_time }}</view>
        </view>
        <view class="flex-1">
          <text class="float-right text-primary">{{ item.cost }}</text>
          <text>{{ item.name }}</text>
          <nut-tag type="primary" class="ml2">{{ item.identity }}</nut-tag>
          <view class="mt-6">
            <text class="w-8 text-primary">科目：</text>
            <text>{{ item.teachingCourse.join(", ") }}</text>
          </view>
          <view class="mt-2">
            <text class="w-8 text-primary">地区：</text>
            <text>{{ item.teachingPosition.join(", ") }}</text>
          </view>
        </view>
      </view>
      <view class="mt-2 flex gap-2">
        <nut-tag type="primary">{{ item.college }}</nut-tag>
        <nut-tag type="primary">{{ item.identity }}</nut-tag>
      </view>
    </sar-card>
  </navigator>
  <view class="m-4 text-lg">文章收藏</view>
  <navigator
    v-for="item in data?.articles" :key="item.title"
    :url="`/pages/article/detail?type=kopp&name=${item.title}`"
  >
    <sar-card class="m-4">
      <view class="flex gap-2">
        <image class="size-20 shrink-0" :src="item.image" mode="aspectFill" />
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

<template>
  <scroll-view>
    <sar-card class="m4">
      <view class="flex gap-2">
        <view class="text-center">
          <nut-avatar class="mb-2" :size="70" />
          <view>最近登录</view>
          <view>今天</view>
        </view>
        <view class="flex-1">
          <text class="float-right">
            <text class="text-primary">¥110</text>
            <text class="text-[#AAA6B9]">/小时</text>
          </text>
          <text>朱飒</text>
          <nut-tag type="primary" class="ml2">研究生教员</nut-tag>
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
        <nut-tag type="primary">重庆大学</nut-tag>
        <nut-tag type="primary">数学师范 研究生</nut-tag>
      </view>
    </sar-card>
    <nut-infiniteloading />
  </scroll-view>
</template>

<script setup lang="ts">
import { teachers } from '@/api'
import type { Teacher } from '@/api/interfaces';

const form = reactive({
  page: 1,
  per_page: 10,
  all: '',
  subjects: '',
  identity: '',
  teaching_type: '',
  teaching_position: '幸福附近',
})

const data = ref<Teacher[]>();

teachers(form).then((resp) => {
  data.value = resp.data.teachers
})
</script>

<style></style>

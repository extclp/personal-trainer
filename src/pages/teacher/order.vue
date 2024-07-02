<template>
  <sar-card class="m-4">
    <view class="flex justify-between text-lg font-semibold">
      <view>学员：朱珠</view>
      <text class="text-primary">{{ data.cost }}</text>
    </view>
    <view>
      <text>任教科目：</text>
      学前拼音
    </view>
    <view>
      <text>课时： </text>
      30课时
    </view>
    <view class="flex justify-between">
      <view>
        <text>匹配教师：</text>
        Teacher
      </view>
      <nut-tag>已完成</nut-tag>
    </view>
  </sar-card>
</template>

<script setup lang="ts">
import { orderList } from '@/api/teacher'

const data = ref()

orderList({
  key: 0,
  page: 1,
  per_page: 10,
}).then((resp) => {
  data.value = resp.data
})
</script>

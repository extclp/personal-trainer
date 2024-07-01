<template>
  <view v-for="item in data?.orders" :key="item.request" class="m-4">
    <nut-cell>
      <view class="relative w-full">
        <view class="flex gap-1 text-lg color-black font-semibold">
          <text class="color-primary">崇川</text>
          <text>学前教学</text>
          <text>{{ item.student_sex }}</text>
        </view>
        <view class="w-full flex">
          <view class="w-full">
            <view class="my-2">
              <view class="inline-block w-18">需求科目:</view>
              {{ item.subject }}
            </view>
            <view class="my-2">
              <view class="inline-block w-18">课时:</view>
              {{ item.course_time }}课时
            </view>
            <view class="mx-y flex">
              <view class="inline-block w-18">教师要求:</view>
              <view class="truncate">{{ item.request }}</view>
            </view>
          </view>
          <view class="flex items-center whitespace-nowrap">
            <image class="h-5 w-5" src="@/static/icons/location.svg" />
            <view>{{ item.address }}</view>
          </view>
        </view>
        <view class="absolute right-0 top-0 text-lg text-primary font-bold">{{ item.cost }}元/小时</view>
      </view>
    </nut-cell>
  </view>
</template>

<script setup lang="ts">
import { type OrderPublic, orderPublic } from '@/api/teacher'

const data = ref<OrderPublic>()

orderPublic({
  page: 1,
  per_page: 999,
}).then((resp) => {
  data.value = resp.data
})
</script>

<style lang="scss"></style>

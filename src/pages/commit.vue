<template>
  <nut-search-bar placeholder="根据用户名/评价内容查找评价" />

  <sar-card class="m-4" v-for="item in data" :key="item.time">
    <view class="flex gap-4">
      <image class="h-10 w-10 rounded-full bg-red mt-2" />
      <view class="flex-1">
        <view class="text-sm">
          <text class="float-right">2020-5-11</text>
          <text>extclp</text>
        </view>
        <view class="my-3">{{ item.content }}</view>
      </view>
    </view>
  </sar-card>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { commitList } from '@/api'
import type { Commit } from '@/api/interfaces'

const data = ref<Commit[]>([])

commitList({
  mobile: 15006294478,
}).then((resp) => {
  data.value = resp.data
  data.value.forEach((it) => {
    it.ago = dayjs(it.time).fromNow()
  })
})
</script>

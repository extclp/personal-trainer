<template>
  <nut-search-bar placeholder="根据用户名/评价内容查找评价" />
  <sar-card v-for="item in data" :key="item.time" class="m-4">
    <view class="flex gap-4">
      <image class="mt-2 h-10 w-10 rounded-full" :src="item.image" />
      <view class="flex-1">
        <view class="text-sm">
          <text class="float-right">{{ ago(item.time) }}</text>
          <text>{{ item.username }}</text>
        </view>
        <view class="my-3">{{ item.message }}</view>
      </view>
    </view>
  </sar-card>
</template>

<script setup lang="ts">
import { teacherDetail } from '@/api'
import type { Message } from '@/api/interfaces'
import { ago } from '@/utls';

const data = ref<Message[]>([])

teacherDetail({ phone: uni.getStorageSync('phone') }).then((resp) => {
  data.value = resp.data.messages
})
</script>

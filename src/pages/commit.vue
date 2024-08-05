<template>
  <nut-search-bar placeholder="根据用户名/评价内容查找评价" />

  <sar-card v-for="item in data" :key="item.time" class="m-4">
    <view class="flex gap-4">
      <image class="mt-2 h-10 w-10 rounded-full" :src="avatar" mode="aspectFill" />
      <view class="flex-1">
        <view class="text-sm">
          <text class="float-right">{{ ago(item.time) }}</text>
          <text>{{ nickName }}</text>
        </view>
        <view class="my-3">{{ item.content }}</view>
      </view>
    </view>
  </sar-card>
</template>

<script setup lang="ts">
import { commitList } from '@/api'
import type { Commit } from '@/api/interfaces'
import { avatar, nickName } from '@/store/basic'
import { ago } from '@/utls'

const data = ref<Commit[]>([])

commitList().then((resp) => {
  data.value = resp.data
})
</script>

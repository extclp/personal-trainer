<template>
  <uni-search-bar placeholder="根据用户名/评价内容查找评价" />
  <view v-for="item in data" :key="item.time">
    <view>{{ item.time }}</view>
    <view>{{ item.content }}</view>
  </view>
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

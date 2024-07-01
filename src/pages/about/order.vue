<template>
  <view class="p-4">
    <view v-for="item in data">
      <view class="text-lg font-600 my-2">{{ item.title }}</view>
      <view class="whitespace-pre-line">{{ item.content }}</view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { manual, type About } from '@/apis/about';


const data = ref<About[]>();

manual().then(resp => {
  data.value = resp.data.data;
})
</script>
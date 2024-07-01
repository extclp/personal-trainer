<template>
  <view class="p-4 whitespace-pre-line">{{ data }}</view>
</template>
<script setup lang="ts">
import { fee } from '@/apis/about';

const data = ref();

fee().then(resp => {
  data.value = resp.data;
})
</script>

<template>
  <view class="whitespace-pre-wrap p-4">{{ data }}</view>
</template>

<script setup lang="ts">
import { fee } from '@/apis/about'

const data = ref()

fee().then((resp) => {
  data.value = resp.data
})
</script>

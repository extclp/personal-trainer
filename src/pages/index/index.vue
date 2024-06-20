<template>
  <view v-if="data">
    <swiper>
      <swiper-item v-for="image in data.image">
        <image :src="image" />
      </swiper-item>
    </swiper>
    <uni-notice-bar :text="data.announcement" />
  </view>
</template>
<script setup lang="ts">
import { home } from "@/api";
import type { HomeData } from "@/api/interfaces";


const data = ref<HomeData>();

home().then(resp => {
  data.value = resp.data;
})
</script>
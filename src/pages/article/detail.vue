<template>
    <view v-if="data" class="p-4">
        <view class="flex gap-2 items-center mb-6">
            <nut-avatar :src="data.image" />
            <view>{{ data.writer }}</view>
            <view class="ml-auto">{{ ago(data.time) }}</view>
        </view>
        <view class="font-600 my-4">{{ data.name }}</view>
        <view>{{ data.content }}</view>
    </view>
</template>
<script setup lang="ts">
import { article } from '@/api';
import type { Article } from '@/api/interfaces';
import { ago } from '@/utls';
import { onLoad } from '@dcloudio/uni-app';

const data = ref<Article>()

onLoad(query => {
    article(query!).then(resp => {
        data.value = resp.data
    })
})
</script>
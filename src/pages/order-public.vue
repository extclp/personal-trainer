<template>
    <nut-cell>
        <view class="p-4 relative w-full">
            <view class="font-semibold flex gap-1 color-black1">
                <span class="color-primary">崇川</span>
                <span>学前教学</span>
                <span>男</span>
            </view>
            <view class="absolute right-0 top-0 text-lg font-bold">110元/小时</view>
        </view>
    </nut-cell>
</template>
<script setup lang="ts">
import { orderList } from '@/api/teacher';

orderList({
    "page": 1,
    "per_page": 10
}).then(resp => {
    console.log(resp)
})
</script>
<style></style>
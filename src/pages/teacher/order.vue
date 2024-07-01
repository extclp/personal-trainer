<template>
    <sar-card class="m-4">
        <view class="flex justify-between text-lg font-semibold">
            <view>学员：朱珠</view>
            <view class="text-primary">110元/小时</view>
        </view>
        <view>
            <text>任教科目：</text>
            学前拼音
        </view>
        <view>
            <text>课时： </text>
            30课时
        </view>
        <view class="flex justify-between">
            <view>
                <text>匹配教师：</text>
                Teacher
            </view>
            <nut-tag>已完成</nut-tag>
        </view>
        <template #footer>
            <view class="flex justify-end gap2">
                <nut-button type="primary" size="mini">删除订单</nut-button>
                <nut-button type="primary" size="mini">评价教师</nut-button>
            </view>
        </template>
    </sar-card>
</template>

<script setup lang="ts">
import { orderList } from '@/api/teacher';

const data = ref()

orderList({
    key: 0,
    page: 1,
    per_page: 10,
}).then((resp) => {
    data.value = resp.data
})
</script>
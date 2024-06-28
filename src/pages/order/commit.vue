<template>
    <image class="h-36 w-full fixed top-0" src="@/static/teacher/bg.png" />
    <sar-card class="m-4 mt-6">
        <view class="flex gap-2">
            <view class="text-center">
                <nut-avatar class="mb-2" :size="70" />
                <view>最近登录</view>
                <view>今天</view>
            </view>
            <view class="flex-1">
                <text class="float-right">
                    <text class="text-primary">¥110</text>
                    <text class="text-[#AAA6B9]">/小时</text>
                </text>
                <text>朱飒</text>
                <nut-tag type="primary" class="ml2">研究生教员</nut-tag>
                <view class="mt-6">
                    <text class="w-8 text-primary">科目：</text>
                    <text>初中数学</text>
                </view>
                <view class="mt-2">
                    <text class="w-8 text-primary">地区：</text>
                    <text>崇川区</text>
                </view>
            </view>
        </view>
        <view class="mt-2 flex gap-2">
            <nut-tag type="primary">重庆大学</nut-tag>
            <nut-tag type="primary">数学师范 研究生</nut-tag>
        </view>
    </sar-card>
    <view class="m-4">评价老师</view>
    <view class="m-4">
        <nut-textarea placeholder="请填写真实评价" />
    </view>
    <view class="m-4">
        <nut-button type="primary" class="mt-4" block>提交</nut-button>
    </view>
</template>
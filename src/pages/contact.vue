<template>
    <view class="p-4">
        <view class="flex justify-around text-center mt-24">
            <view>
                <image class="w-38 h-38" src="@/static/contact/user.jpg" />
                <view class="mt-6">家长客服</view>
            </view>
            <view>
                <image class="w-38 h-38" src="@/static/contact/user.jpg" />
                <view class="mt-6">家长客服</view>
            </view>
        </view>
        <view class="mt-12">
            <nut-button type="primary" block @click="tell">12345678910</nut-button>
        </view>
        <view class="mt-6">
            <nut-button type="primary" block class="mt-6">跳转服务号</nut-button>
        </view>
    </view>
</template>
<script setup lang="ts">

function tell() {
    uni.makePhoneCall({
        phoneNumber: '12345678910' //仅为示例
    });
}
</script>
<template>
  <view class="p-4">
    <view class="mt-24 flex justify-around text-center">
      <view>
        <image class="h-38 w-38" src="@/static/contact/user.jpg" />
        <view class="mt-6">家长客服</view>
      </view>
      <view>
        <image class="h-38 w-38" src="@/static/contact/user.jpg" />
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
    phoneNumber: '12345678910', // 仅为示例
  })
}
</script>

<template>
  <sar-card class="m-4">
    <view class="flex items-center gap-4">
      <nut-avatar :size="50" />
      <view class="font-600">
        <view>教师A</view>
        <view class="mt-2 text-sm">努力奋斗上进</view>
      </view>
    </view>
  </sar-card>
  <uni-card title="服务">
    <view class="flex justify-evenly text-center">
      <view>
        <image class="size-8" src="@/static/user/create.svg" />
        <view>创建订单</view>
      </view>
      <view>
        <image class="size-8" src="@/static/user/order.svg" />
        <view>我的订单</view>
      </view>
      <template v-if="teacher">
        <view>
          <image class="size-8" src="@/static/user/edit.svg" />
          <view>编辑简历</view>
        </view>
        <view>
          <image class="size-8" src="@/static/user/bage.svg" />
          <view>我的工牌</view>
        </view>
      </template>
      <template v-else>
        <view>
          <image class="size-8" src="@/static/user/finished.svg" />
          <view>完成订单</view>
        </view>
        <view>
          <image class="size-8" src="@/static/user/register.svg" />
          <view>教员注册</view>
        </view>
      </template>
    </view>
  </uni-card>
  <nut-cell-group class="m-4">
    <nut-cell is-link to="/pages/about/teacher">
      <template #title>
        <view class="flex items-center gap-3">
          <image class="size-6" src="@/static/user/about-teacher.svg" />
          <view>家教说明</view>
        </view>
      </template>
    </nut-cell>
    <nut-cell is-link to="/pages/favorite">
      <template #title>
        <view class="flex items-center gap-3">
          <image class="size-6" src="@/static/user/favorite.svg" />
          <view>收藏列表</view>
        </view>
      </template>
    </nut-cell>
    <nut-cell is-link to="/pages/about/fees">
      <template #title>
        <view class="flex items-center gap-3">
          <image class="size-6" src="@/static/user/about-fee.svg" />
          <view>家教说明</view>
        </view>
      </template>
    </nut-cell>
    <nut-cell is-link to="/pages/about/order">
      <template #title>
        <view class="flex items-center gap-3">
          <image class="size-6" src="@/static/user/about-order.svg" />
          <text>接单说明</text>
        </view>
      </template>
    </nut-cell>
  </nut-cell-group>
</template>

<script setup lang="ts">
const teacher = ref(true)
</script>

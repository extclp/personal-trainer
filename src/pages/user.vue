<template>
  <sar-card class="m-4">
    <view class="flex items-center gap-4">
      <image class="size-12 rounded-full" :src="avatar" mode="aspectFill" />
      <view class="font-600">
        <view>{{ nickName }}</view>
        <view class="mt-2 text-sm">{{ qianming }}</view>
      </view>
      <navigator v-if="!isTeacher" class="ml-a" url="/pages/setting">
        <image class="ml-a size-6" src="@/static/user/setting.svg" />
      </navigator>
    </view>
  </sar-card>
  <uni-card v-if="isTeacher" title="服务">
    <view class="flex justify-between text-center">
      <navigator url="/pages/teacher/my-commit">
        <image class="size-8" src="@/static/user/commit.svg" />
        <view>我的评价</view>
      </navigator>
      <navigator url="/pages/teacher/order">
        <image class="size-8" src="@/static/user/order.svg" />
        <view>我的订单</view>
      </navigator>
      <navigator url="/pages/teacher/update">
        <image class="size-8" src="@/static/user/edit.svg" />
        <view>编辑简历</view>
      </navigator>
      <navigator url="/pages/teacher/badge">
        <image class="size-8" src="@/static/user/badge.svg" />
        <view>我的工牌</view>
      </navigator>
    </view>
  </uni-card>
  <uni-card v-else title="服务">
    <view class="flex justify-between text-center">
      <navigator url="/pages/publish" open-type="switchTab">
        <image class="size-8" src="@/static/user/create.svg" />
        <view>创建订单</view>
      </navigator>
      <navigator url="/pages/order/index">
        <image class="size-8" src="@/static/user/order.svg" />
        <view>我的订单</view>
      </navigator>
      <navigator url="/pages/order/finished">
        <image class="size-8" src="@/static/user/finished.svg" />
        <view>完成订单</view>
      </navigator>
      <navigator url="/pages/teacher/register">
        <image class="size-8" src="@/static/user/register.svg" />
        <view>教员注册</view>
      </navigator>
    </view>
  </uni-card>
  <nut-cell-group class="m-4">
    <nut-cell is-link @click="qrcode">
      <template #title>
        <view class="flex items-center gap-3">
          <image class="size-6" src="@/static/icons/qrcode.svg" />
          <view>扫描二维码</view>
        </view>
      </template>
    </nut-cell>
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
    <nut-cell is-link to="/pages/about/fee">
      <template #title>
        <view class="flex items-center gap-3">
          <image class="size-6" src="@/static/user/about-fee.svg" />
          <view>关于价格</view>
        </view>
      </template>
    </nut-cell>
    <nut-cell v-if="isTeacher" is-link to="/pages/about/order">
      <template #title>
        <view class="flex items-center gap-3">
          <image class="size-6" src="@/static/user/about-order.svg" />
          <text>接单说明</text>
        </view>
      </template>
    </nut-cell>
    <nut-cell is-link @click="logout">
      <template #title>
        <view class="flex items-center gap-3">
          <image class="size-6" src="@/static/user/logout.svg" />
          <text>退出登录</text>
        </view>
      </template>
    </nut-cell>
  </nut-cell-group>
</template>

<script setup lang="ts">
import { isTeacher } from '@/store/index'
import { nickName, avatar, qianming } from '@/store/basic';
import CryptoJS from 'crypto-js'

function logout() {
  uni.showModal({
    title: '是否退出登录',
    success(res) {
      if (res.confirm) {
        uni.removeStorageSync('token')
        uni.showToast({ title: '退出登录成功' })
        uni.navigateTo({ url: '/pages/login' })
      }

    },
  })
}

function qrcode() {
  // #ifdef MP-WEIXIN
  uni.scanCode({
    scanType: ["qrCode"],
    success(res) {
      const result = JSON.parse(res.result)

      const key = 'xkVZV6O8GhZJjO7C8H3tp5XTJoi3j2i1t7kOyxPeX9M=';

      const keyWords = CryptoJS.enc.Base64.parse(key);


      const encryptedWords = CryptoJS.enc.Base64.parse(result.teacher);

      // @ts-ignore
      const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedWords }, keyWords, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });

      // 将解密后的数据转换为UTF-8字符串
      const teacher = decrypted.toString(CryptoJS.enc.Utf8);

      uni.navigateTo({ url: `/pages/teacher/detail?phone=${teacher}` })

    }
  })
  // #endif
}
</script>

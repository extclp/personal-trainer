<template>
  <template v-if="data">
    <Location :locations="data.address" />
    <swiper class="m-4 h-40">
      <swiper-item v-for="image in data.image">
        <image class="w-full" :src="image" mode="aspectFill" />
      </swiper-item>
    </swiper>

    <uni-card>
      <view class="flex gap-2">
        <image class="h-6 w-6" src="@/static/icons/notice.svg" />
        <swiper class="h-6 flex-1" autoplay vertical>
          <swiper-item v-for="item in data.announcement">
            {{ item }}
          </swiper-item>
        </swiper>
      </view>
    </uni-card>
    <uni-card>
      <view v-for="notice in data.notice" :Key="notice.name">
        {{ notice.name }}
      </view>
    </uni-card>
    <view class="m-4">教务咨询</view>
    <scroll-view scroll-x class="m-4 whitespace-nowrap">
      <view v-for="item in data.academic_news" :key="item.name"
        class="relative mr-4 inline-block h-60 w-60 rounded-10 text-white" @click="articleDetail(item.id)">
        <image class="h-full w-full" src="@/static/image/home/new-bg.png" />
        <view class="absolute left-4 top-4 text-5 font-bold">{{ item.title }}</view>
        <view class="absolute top-40 whitespace-normal px-4 font-black">{{ item.name }}</view>
      </view>
    </scroll-view>
    <view>留言发布栏</view>
    <view class="m-4 flex gap-2">
      <sar-input v-model="message" class="flex-1 bg-white" />
      <button type="primary" size="mini" @click="sendMessage">发布留言</button>
    </view>
    <view v-for="message in data.message" :key="message.time" class="flex gap-4 px-7 py-4">
      <image class="h-10 w-10 rounded-full bg-white" />
      <view class="flex-1 border border-slate-300 border-b-solid">
        <view class="text-sm">
          <text class="float-right">{{ ago(message.time) }}</text>
          <text>{{ message.username }}</text>
        </view>
        <view class="my-4"> {{ message.message }} </view>
      </view>
    </view>
  </template>
</template>

<script setup lang="ts">
import { home, messageSend } from '@/api'
import type { HomeData } from '@/api/interfaces'
import Location from '@/components/Location.vue'
import { ago } from '@/utls'

const data = ref<HomeData>()

const message = ref<string>()

function articleDetail(id: number) {
  uni.navigateTo({ url: `/pages/article/detail?id=${id}` })
}

home({
  per_page: 2,
}).then((resp) => {
  data.value = resp.data
})

function sendMessage() {
  if (!message.value) {
    uni.showToast({ title: '请输入留言' })
    return
  }
  messageSend({
    content: message.value,
  }).then(() => {
    uni.showToast({ title: '留言发送成功' })
  })
}
</script>

<template>
  <template v-if="data">
    <Location :locations="data.address" />
    <swiper class="m-4 h-40">
      <swiper-item v-for="image in data.image" :key="image">
        <image class="w-full" :src="image" mode="aspectFill" />
      </swiper-item>
    </swiper>
    <uni-card>
      <view class="flex gap-2">
        <image class="size-6" src="@/static/icons/notice.svg" />
        <swiper class="h-6 flex-1" autoplay vertical>
          <swiper-item v-for="item in data.announcement" :key="item">
            <view class="lh-6">{{ item }}</view>
          </swiper-item>
        </swiper>
      </view>
    </uni-card>
    <sar-card class="m-4">
      <view class="mb-2 flex gap-2 text-primary font-700">
        <image class="size-5" src="@/static/home/notice.svg" />
        <view>通知栏</view>
      </view>
      <navigator
        v-for="notice in data.notice" :key="notice.name"
        :url="`/pages/article/detail?type=notice&name=${notice.name}`"
      >
        <view class="my-1 truncate">
          • {{ notice.name }}
        </view>
      </navigator>
    </sar-card>
    <view class="m-4 flex justify-between">
      <view>教务咨询</view>
      <navigator url="/pages/article/index">
        <view class="flex items-center gap-1">
          <text>更多</text>
          <nut-icon name="right" />
        </view>
      </navigator>
    </view>
    <scroll-view scroll-x class="m-4 whitespace-nowrap">
      <view
        v-for="item in data.academic_news" :key="item.name"
        class="relative mr-4 inline-block size-60 rounded-10 text-white" @click="catlog(item.title)"
      >
        <image class="h-full w-full" :src="item.image" mode="aspectFill" />
        <view class="absolute left-4 top-4 text-5 font-bold">{{ item.title }}</view>
        <view class="absolute top-40 whitespace-normal px-4 font-black">{{ item.name }}</view>
      </view>
    </scroll-view>
    <view class="m4">留言发布栏</view>
    <view class="m-4 flex gap-2">
      <sar-input v-model="message" class="flex-1 bg-white" />
      <button type="primary" size="mini" @click="sendMessage">发布留言</button>
    </view>
    <view v-for="message in data.message" :key="message.time" class="flex gap-4 px-7 py-4">
      <image class="h-10 w-10 rounded-full bg-white" :src="message.image" mode="aspectFill" />
      <view class="flex-1 border border-slate-300 border-b-solid">
        <view class="text-sm">
          <text class="float-right">{{ ago(message.time) }}</text>
          <text>{{ message.username }}</text>
        </view>
        <view class="mb-4 mt-2"> {{ message.message }} </view>
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

function catlog(tag: string) {
  uni.navigateTo({ url: `/pages/article/list?tag=${tag}` })
}

function getList() {
  home({
    per_page: 1000,
  }).then((resp) => {
    data.value = resp.data
  })
}
getList()

function sendMessage() {
  if (!message.value) {
    uni.showToast({ title: '请输入留言' })
    return
  }
  messageSend({
    content: message.value,
  }).then(() => {
    getList()
    message.value = ''
    uni.showToast({ title: '留言发送成功' })
  })
}
</script>

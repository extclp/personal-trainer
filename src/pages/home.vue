<template>
  <template v-if="homeData">
    <Location :locations="homeData.address" />
    <swiper class="m-4 h-40">
      <swiper-item v-for="image in homeData.image">
        <image class="w-full" :src="image" mode="aspectFill" />
      </swiper-item>
    </swiper>

    <uni-card>
      <view class="flex gap-2">
        <image class="h-6 w-6" src="@/static/icons/notice.svg" />
        <swiper class="h-6 flex-1" autoplay vertical>
          <swiper-item v-for="item in homeData.announcement">
            {{ item }}
          </swiper-item>
        </swiper>
      </view>
    </uni-card>

    <view class="m-4 overflow-hidden rounded-xl text-center">
      <view class="flex color-white">
        <navigator url="/pages/teacher/index" class="w-full">
          <view class="techer-detail h-20 w-full center">
            <image class="mr-2 h-5 w-5" src="@/static/home/教员简介.png" />
            <view>教员介绍</view>
          </view>
        </navigator>
        <navigator url="/pages/teacher/register" class="w-full">
          <view class="techer-register h-20 w-full center">
            <image class="mr-2 h-5 w-5" src="@/static/home/学员需求.png" />
            <view>教员注册</view>
          </view>
        </navigator>
      </view>
      <view class="grid grid-cols-4">
        <navigator
          v-for="(course, i) in data?.search_list.teachingCourse"
          :url="`/pages/teacher/index?name=${course}`"
        >
          <view class="lh-20" :style="colors[i]">
            {{ course }}
          </view>
        </navigator>
      </view>
    </view>
    <view class="m-4 flex gap-3 text-sm">
      <view class="bg-r h-20 w-full center gap-1 b-10 rounded-xl" @click="teacherList('大学生教员')">
        <image class="h-5 w-5" src="@/static/home/大学生教员.png" />
        <view>大学生教员</view>
      </view>
      <view class="bg-r h-20 w-full center gap-1 b-10 rounded-xl" @click="teacherList('研究生教员')">
        <image class="h-5 w-5" src="@/static/home/研究生教员.png" />
        <view>研究生教员</view>
      </view>
      <view class="bg-r h-20 w-full center gap-1 b-10 rounded-xl" @click="teacherList('专业教员')">
        <image class="h-5 w-5" src="@/static/home/专业教员.png" />
        <view>专业教员</view>
      </view>
    </view>
  </template>
</template>

<script setup lang="ts">
import { bigList, home } from '@/api'
import type { BigData, HomeData } from '@/api/interfaces'

const data = ref<BigData>()

const homeData = ref<HomeData>()

function teacherList(name: string) {
  uni.navigateTo({ url: `/pages/teacher/index?name=${name}` })
}

bigList({
  name: '教员简介',
  page: 1,
  per_page: 10,
}).then((resp) => {
  data.value = resp.data
})

home({
  page: 1,
  per_page: 10,
}).then((resp) => {
  homeData.value = resp.data
})

const colors = [
  'background-color: #fff5f4; color: #c2975c',
  'background-color: #fef8e8; color: #c89d60',
  'background-color: #e4f0ff; color: #acc7fe',
  'background-color: #effff5; color: #40ad77',
  'background-color: #f5fffe; color: #66b7bb;',
  'background-color: #ffeffb; color: #e272b2',
  'background-color: #e5fdff; color: #6fb3be',
  'background-color: #fadcd4;color: #f7b6b8;',
]

const images = [
  '',
]
</script>

<style>
.techer-detail {
    background: linear-gradient(to bottom, #fa6954, #fa804d);
}

.techer-register {
    background: linear-gradient(to bottom, #4e8ce5, #4faaf9);
}

.bg-r {
    background: #e9efff;
}
</style>

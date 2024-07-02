<template>
  <template v-if="data">
    <image class="absolute top-0 h-36 w-full" src="@/static/teacher/bg.png" />
    <view class="p-4 pt-15">
      <sar-card clas="h-32">
        <view class="relative top--8">
          <view class="flex items-end gap-2">
            <nut-avatar :size="70" :src="data.image" />
            <view class="mb-4 flex gap-2">
              <nut-tag type="primary" size="mini">{{ data.age }}</nut-tag>
              <nut-tag type="primary" size="mini">教龄：{{ data.tutorAge }}</nut-tag>
              <nut-tag type="primary" size="mini">{{ data.identity }}</nut-tag>
            </view>
          </view>
          <view class="mt-2 flex items-center gap-2">
            <text class="text-5 font-700">{{ data.name }}</text>
            <text class="text-sm">登陆时间: {{ data.login_time }}</text>
          </view>
          <view class="mt-2">在校研究生；可线上教学</view>
        </view>
      </sar-card>
    </view>
    <view class="mx-4 font-600">任教信心</view>
    <sar-card class="m-4">
      <view>
        <view class="mb-2 text-lg text-primary">教学经验</view>
        <view class="whitespace-pre-line">{{ data.introduction }}</view>
      </view>
    </sar-card>
    <sar-card class="m-4">
      <view>
        <view class="my-2 text-lg text-primary">任教科目</view>
        <view v-for="item in data.teachingCourse">{{ item }}</view>
        <view class="my-2 text-lg text-primary">任教方式</view>
        <view class="flex gap-2">
          <view v-for="item in data.teachingStyle">
            <nut-tag type="primary">{{ item }}</nut-tag>
          </view>
        </view>
        <view class="my-2 text-lg text-primary">任教地点</view>
        <nut-tag type="primary">南大街附近</nut-tag>
      </view>
    </sar-card>
    <sar-card class="m-4">
      <view class="my-2 text-lg text-primary">任教时间</view>
      <view class="table-border w-full table table-auto text-center">
        <view class="table-row">
          <view class="table-cell py-2" />
          <view v-for="d in '一二三四五六日'" :key="d" class="table-cell py-2">周{{ d }}</view>
        </view>
        <view v-for="(period, pi) in ['上午', '下午', '晚上']" :key="period" class="table-row">
          <view class="table-cell p-2">{{ period }}</view>
          <view v-for="(d, index) in '一二三四五六日'" :key="d" class="table-cell p-2">
            <Checkbox v-model="data.teachingTime[pi]" passive :value="index + 1" />
          </view>
        </view>
      </view>
    </sar-card>
    <sar-card class="m-4">
      <view class="my-2 text-lg text-primary">授课费用</view>
      <text class="text-primary">{{ data.cost }}</text>
      <navigator>
        （查看平台参考标准）
      </navigator>
      <view class="my-2 text-lg text-primary">所获证书</view>
      <view v-if="data.personalExperience.length == 0">
        暂无
      </view>
      <!-- <view v-else>
        <view v-for="item in data.personalExperience" class="my-2">{{ item }}</view>
      </view> -->
    </sar-card>
    <view class="mx-4 font-600">教师评价</view>
    <sar-card class="m-4">
      <view class="flex gap-4">
        <image class="mt-2 h-10 w-10 rounded-full bg-red" />
        <view class="flex-1 border border-slate-300 border-b-solid">
          <view class="text-sm">
            <text class="float-right">2020-5-11</text>
            <text>extclp</text>
          </view>
          <view class="my-3">测试</view>
        </view>
      </view>
    </sar-card>
  </template>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import Checkbox from '@/components/Checkbox.vue'
import { teacherDetail } from '@/api'
import type { Teacher } from '@/api/interfaces'

const data = ref<Teacher>()

onLoad((query) => {
  const { phone } = query!
  teacherDetail({ phone }).then((resp) => {
    data.value = resp.data.teacher_detail
  })
})
</script>

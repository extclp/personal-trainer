<template>
  <template v-if="data">
    <image class="fixed top-0 h-36 w-full" src="@/static/teacher/bg.png" />
    <sar-card class="m-4 mt-6">
      <view class="flex gap-2">
        <view class="text-center">
          <nut-avatar class="mb-2" :size="70" />
          <view class="text-xs text-[#AAA6B9]">最近登录</view>
          <view class="mt-1 text-xs text-[#AAA6B9]">{{ data.login_time }}</view>
        </view>
        <view class="flex-1">
          <text class="float-right text-primary">{{ data.cost }}</text>
          <text>{{ data.name }}</text>
          <nut-tag type="primary" class="ml2">{{ data.identity }}</nut-tag>
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
      <nut-textarea v-model="form" placeholder="请填写真实评价" />
    </view>
    <view class="m-4">
      <nut-button type="primary" class="mt-4" block @click="commit">提交</nut-button>
    </view>
  </template>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { teacherDetail, teahcerCommit } from '@/api'
import type { Teacher } from '@/api/interfaces'

const data = ref<Teacher>()

const form = reactive({
  c_phone: uni.getStorageSync('phone'),
  t_phone: '',
  content: '',
})

let phone: string

onLoad((query) => {
  phone = query!.phone
  form.t_phone = phone
  teacherDetail({ phone }).then((resp) => {
    data.value = resp.data.teacher_detail
  })
})

function commit() {
  teahcerCommit(form).then(() => {
    form.content = ''
    uni.showToast({ title: '评价老师成功' })
  })
}
</script>

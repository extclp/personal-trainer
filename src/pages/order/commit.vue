<template>
  <template v-if="data">
    <image class="fixed top-0 h-36 w-full" src="@/static/teacher/bg.png" />
    <view class="m-4 pt-15">
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
    <view class="m-4">评价老师</view>
    <view class="m-4">
      <nut-textarea v-model="form.content" placeholder="请填写真实评价" />
    </view>
    <view class="m-4 mt-10">
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

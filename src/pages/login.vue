<template>
  <view class="p-4 pt-15 text-center">
    <view class="text-3xl">手机验证码登录</view>
    <view class="text-xs1 mb-15 mt-4 text-#969799">未注册的手机号将自动注册并登录</view>
    <nut-form-item label="手机号">
      <nut-input v-model="form.mobile" />
    </nut-form-item>
    <nut-form-item label="验证码">
      <nut-input v-model="form.captcha">
        <template #right>
          <nut-button type="primary" size="small" @click="handleSendCode">获取验证码</nut-button>
        </template>
      </nut-input>
    </nut-form-item>
    <view class="mt-10">
      <nut-button type="primary" block @click="handleLogin">登录</nut-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { login, sendCode } from '@/api'
import { setTeacher } from '@/store'

if (uni.getStorageSync('token')) {
  uni.switchTab({ url: '/pages/home' })
}

const form = reactive({
  mobile: uni.getStorageSync('phone'),
  captcha: '',
  token: '',
})

function handleSendCode() {
  sendCode(form).then((resp) => {
    console.log(resp)
    uni.showToast({ title: '验证码已发送' })
  })
}

function handleLogin() {
  login(form).then((resp) => {
    uni.setStorageSync('token', resp.token)
    uni.setStorageSync('nickName', resp.nick_name)
    uni.setStorageSync('phone', form.mobile)
    uni.setStorageSync('qianming', resp.qianming)
    uni.setStorageSync('avatar', resp.avatar)

    setTeacher(resp.key)
    uni.showToast({ title: '登录成功' })
    uni.switchTab({ url: '/pages/home' })
  })
}
</script>

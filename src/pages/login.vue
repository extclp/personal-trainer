<template>
  <uni-forms>
    <uni-forms-item label="手机号">
      <input v-model="form.mobile">
    </uni-forms-item>
    <uni-forms-item label="验证码">
      <input v-model="form.captcha">
    </uni-forms-item>
  </uni-forms>
  <button type="primary" @click="handleSendCode">验证码</button>
  <button type="primary" class="mt-4" @click="handleLogin">登录</button>
</template>

<script setup lang="ts">
import { login, sendCode } from '@/api'

if (uni.getStorageSync("token")) {
  uni.navigateTo({ url: "/pages/publicity" })
}

const form = reactive({
  mobile: '15006294478',
  captcha: '',
})

function handleSendCode() {
  sendCode(form).then((resp) => {
    console.log(resp)
    uni.showToast({ title: resp.content })
  })
}

function handleLogin() {
  login(form).then((resp) => {
    localStorage.setItem('token', resp.token)
    localStorage.setItem('phone', form.mobile)
    uni.navigateTo({
      url: '/pages/home/index',
    })
  })
}
</script>

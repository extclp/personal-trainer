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
          <nut-button v-if="countdown" type="primary" size="small" disabled @click="handleSendCode">{{ countdown }}</nut-button>
          <nut-button v-else type="primary" size="small" @click="handleSendCode">获取验证码</nut-button>
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
import { avatar, nickName, qianming } from '@/store/basic'

if (uni.getStorageSync('token')) {
  uni.switchTab({ url: '/pages/home' })
}

const form = reactive({
  mobile: uni.getStorageSync('phone'),
  captcha: '',
  token: '',
})

const countdown = ref(0)

function handleSendCode() {
  if (!form.mobile) {
    uni.showToast({ title: '请先输入手机号', icon: 'error' })
    return
  }
  sendCode(form).then((resp) => {
    console.log(resp)
    uni.showToast({ title: '验证码已发送' })
  })

  countdown.value = 60

  const interval = setInterval(() => {
    countdown.value--
    if (countdown.value == 0) {
      clearInterval(interval)
    }
  }, 1000)
}

function handleLogin() {
  login(form).then((resp) => {
    uni.setStorageSync('token', resp.token)
    uni.setStorageSync('phone', form.mobile)

    nickName.value = resp.nick_name
    qianming.value = resp.qianming
    avatar.value = resp.avatar

    setTeacher(resp.key)
    uni.showToast({ title: '登录成功' })
    uni.switchTab({ url: '/pages/home' })
  })
}
</script>

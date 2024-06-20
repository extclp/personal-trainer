<template>
    <input v-model="form.captcha" />
    <button type="primary" @click="hCode">验证码</button>
    <button type="primary" @click="handleLogin">登录</button>
</template>
<script setup lang="ts">
import { login, sendCode } from "@/api"

const form = reactive({
    mobile: "19177741556",
    captcha: "",
    token: ""
})

function hCode() {
    sendCode(form)
}

function handleLogin() {
    login(form).then(resp => {
        console.log(resp)
    })
}
</script>
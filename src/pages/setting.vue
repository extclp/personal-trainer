<template>
  <view class="p-4">
    <nut-form ref="formRef" :rules="rules" :model-value="form">
      <nut-form-item label="头像" prop="image">
        <nut-uploader v-model:file-list="filelist" :maximum="1" :before-upload="beforeUpload" />
      </nut-form-item>
      <nut-form-item label="昵称" prop="nick_name">
        <nut-input v-model="form.nick_name" />
      </nut-form-item>
      <nut-form-item label="签名">
        <nut-input v-model="form.qianming" prop="qianming" />
      </nut-form-item>
      <view class="mt-10">
        <nut-button type="primary" block @click="onSubmit">更新资料</nut-button>
      </view>
    </nut-form>
  </view>
</template>

<script setup lang="ts">
import type { FileItem, FormInst, UploadOptions } from 'nutui-uniapp'
import { edit } from '@/api'
import { ploadFilePromise } from '@/utls/image-tools'

const rules = {
  avatar: [{ required: true, message: '头像不能为空' }],
  nick_name: [{ required: true, message: '昵称不能为空' }],
  qianming: [{ required: true, message: '签名不能为空' }],
}

const form = reactive({
  phone: uni.getStorageSync('phone'),
  image: uni.getStorageSync('avatar'),
  nick_name: uni.getStorageSync('nickName'),
  qianming: uni.getStorageSync('qianming'),
})

const formRef = ref<FormInst>()

function onSubmit() {
  formRef.value!.validate().then(({ valid }) => {
    if (!valid) {
      return
    }
    edit(form).then(() => {
      uni.setStorageSync('nickName', form.nick_name)
      uni.setStorageSync('avatar', form.image)
      uni.setStorageSync('qianming', form.qianming)

      uni.showToast({ title: '更新资料成功' })
      uni.switchTab({ url: '/pages/home' })
    })
  })
}

const filelist = ref<FileItem[]>([{
  name: '文件3.png',
  status: 'success',
  message: '上传中...',
  url: uni.getStorageSync('avatar'),
  type: 'image',
}])

function beforeUpload(_: any, options: UploadOptions) {
  ploadFilePromise(options.filePath!).then((base64) => {
    form.image = base64
    options.onSuccess?.(null as any, options)
    filelist.value = [{
      name: '文件3.png',
      status: 'success',
      message: '上传中...',
      url: base64,
      type: 'image',
    }]
  })
}
</script>

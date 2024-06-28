<template>
  <view class="p-4">
    <view class="py-2 text-lg font-medium">个人信息</view>
    <view class="py-2">个人证件照</view>
    <nut-uploader v-model:file-list="filelist" :maximum="1" :before-upload="beforeUpload" />
    <view class="py-2">姓名</view>
    <nut-input />
    <view class="py-2">生日</view>
    <nut-input />
    <view class="py-2">联系方式</view>
    <nut-input />
    <view class="py-2">毕业学校</view>
    <nut-input />
    <view class="py-2">专业</view>
    <nut-input />
    <view class="py-2">教龄</view>
    <nut-input />
    <view class="py-2 text-lg font-medium">教员信息</view>
    <view class="py-2">任教对线</view>
    <nut-input />
    <view class="py-2">任教方式</view>
    <nut-input />
    <view class="py-2">任教时间</view>
    <table class="w-full">
      <tr>
        <th />
        <th v-for="d in '一二三四五六日'" :key="d">周{{ d }}</th>
      </tr>
      <tr v-for="(period, pi) in ['上午', '下午', '晚上']" :key="period">
        <th>{{ period }}</th>
        <th v-for="(d, index) in '一二三四五六日'" :key="d">
          <Checkbox v-model="form.teachingTime[pi][index]" />
        </th>
      </tr>
    </table>
    <nut-input />
    <view class="py-2">课酬要求</view>
    <nut-input />
    <view class="py-2">任教区域</view>
    <nut-input />
    <view class="py-2">任教科目</view>
    <nut-input />
    <view class="py-2">任教经历</view>
    <nut-input />
    <view class="py-2">自我描述</view>
    <nut-textarea />
    <view class="mt-4">
      <nut-button type="primary" block>确认注册</nut-button>
    </view>
    <nut-checkbox v-model="agreement" class="my-2">
      我已阅读并同意 《用户服务协议》及《隐私协议》
    </nut-checkbox>
  </view>
</template>

<script setup lang="ts">
import type { FileItem, UploadOptions } from 'nutui-uniapp'
import Checkbox from '@/components/Checkbox.vue'

const form = ref({
  phone: '19177741556',
  name: '孙傲',
  sex: '男',
  school: '南通大学',
  major: '软件工程',
  birthday: '2023-11-23',
  tutorAge: '1-2年',
  image: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
  identity: '研究生教员',
  teachingCourse: [
    '学前  拼音',
  ],
  teachingPosition: [
    '崇川',
  ],
  student: '机构',
  teachingStyle: [
    '线上',
  ],
  teachingTime: Array(3).fill([]).map(it => Array(7)),
  address: 'xxxxxuyyyy',
  cost: '80-100/h',
  introduction: 'xxxx',
  personalExperience: [
    '2000年 南通一中 语文老师',
    '2022年 南通二中 英语老师',
  ],
  achievement: [
    '2000年 服务外包比赛 国一',
    '2022年 服务外包比赛 国三',
  ],
})

const agreement = ref(false)

const filelist = ref<FileItem[]>([
  {
    name: '文件3.png',
    url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
    status: 'success',
    message: '上传中...',
    type: 'image',
  },
])

// filelist.value = [{ name: "", url: form.value.image }]

function beforeUpload(_: any, options: UploadOptions) {
  options.onSuccess?.(null as any, options)

  convertBlobUrlToBase64(options.filePath!, (base64) => {
    filelist.value = [{ path: `data:image/png;base64,${base64}` }]
    console.log(filelist.value)
  })
}

function convertBlobUrlToBase64(blobUrl: string, callback: Function) {
  uni.request({
    url: blobUrl,
    method: 'GET',
    responseType: 'arraybuffer',
    success(res) {
      // 将 ArrayBuffer 转换为 Blob
      const blob = new Blob([res.data])

      // 创建 FileReader 对象
      const reader = new FileReader()

      // 定义 FileReader 的 onload 回调
      reader.onload = function (event) {
        const base64String = event.target.result
        callback(base64String)
      }

      // 将 Blob 数据读取为 DataURL (Base64)
      reader.readAsDataURL(blob)
    },
    fail(err) {
      console.error('Error:', err)
    },
  })
}
</script>

<style>
page {
    background: white;
}

th {
    padding: 16rpx;
    border-bottom: 1px #ebeef5 solid;
    border-right: 1px #ebeef5 solid;
}
</style>

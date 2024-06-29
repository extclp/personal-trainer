<template>
  <view class="p-4">
    <view class="py-2 text-lg font-medium">个人信息</view>
    <view class="py-2">个人证件照</view>
    <nut-uploader v-model:file-list="filelist" :maximum="1" :before-upload="beforeUpload" />
    <view class="py-2">姓名</view>
    <nut-input v-model="form.name" />
    <view class="py-2">生日</view>
    <view style="padding: 10px 25px; border-bottom: 1px solid  #eaf0fb">
      <sar-datetime-picker-input v-model="birthday" />
    </view>
    <view class="py-2">联系方式</view>
    <nut-input v-model="form.phone" />
    <view class="py-2">毕业学校</view>
    <nut-input v-model="form.school" />
    <view class="py-2">专业</view>
    <nut-input v-model="form.major" />
    <view class="py-2">教龄</view>
    <view style="padding: 10px 25px; border-bottom: 1px solid  #eaf0fb">
      <sar-picker-input v-model="form.tutorAge" :columns="dataList?.tutor_age" />
    </view>
    <view class="py-2 text-lg font-medium">教员信息</view>
    <view class="py-2">任教对线</view>
    <view style="padding: 10px 25px; border-bottom: 1px solid  #eaf0fb">
      <sar-picker-input v-model="form.address" :columns="dataList?.teachingPosition" />
    </view>
    <view class="py-2">任教方式</view>
    <view style="padding: 10px 25px; border-bottom: 1px solid  #eaf0fb">
      <nut-checkbox-group v-model="form.teachingStyle">
        <nut-checkbox label="线上">线上</nut-checkbox>
        <nut-checkbox label="线下">线下</nut-checkbox>
      </nut-checkbox-group>
    </view>
    <view class="py-2">任教时间</view>
    <table class="w-full">
      <tr>
        <th />
        <th v-for="d in '一二三四五六日'" :key="d">周{{ d }}</th>
      </tr>
      <tr v-for="(period, pi) in ['上午', '下午', '晚上']" :key="period">
        <th>{{ period }}</th>
        <th v-for="(d, index) in '一二三四五六日'" :key="d">
          <Checkbox v-model="teachingTime[pi][index]" />
        </th>
      </tr>
    </table>
    <view class="py-2">课酬要求</view>
    <view style="padding: 10px 25px; border-bottom: 1px solid  #eaf0fb">
      <sar-picker-input v-model="form.cost" :columns="dataList?.cost" />
    </view>
    <view class="py-2">任教区域</view>
    <view style="padding: 10px 25px; border-bottom: 1px solid  #eaf0fb">
      <sar-picker-input v-model="form.address" :columns="dataList?.teachingPosition" />
    </view>
    <view class="py-2">任教科目</view>
    <nut-input />
    <view class="py-2">任教经历</view>
    <nut-input />
    <view class="py-2">自我描述</view>
    <nut-textarea v-model="form.introduction" />
    <view class="mt-4">
      <nut-button type="primary" block>确认注册</nut-button>
    </view>
    <nut-checkbox v-model="agreement" class="my-2">
      <navigator url="/pages/about/agreement">
        我已阅读并同意 《用户服务协议》及《隐私协议》
      </navigator>
    </nut-checkbox>
  </view>
</template>

<script setup lang="ts">
import type { FileItem, UploadOptions } from 'nutui-uniapp'
import Checkbox from '@/components/Checkbox.vue'
import { ploadFilePromise } from '@/utls/image-tools';
import { listData } from '@/store';

const dataList = listData();



const form = ref({
  phone: '19177741556',
  name: '孙傲',
  sex: '男',
  school: '南通大学',
  major: '软件工程',
  birthday: '2023-11-23',
  tutorAge: '1-2年',
  image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAAXCAYAAADTEcupAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAVGSURBVGhD7ZpLKHRvHMd/3o1LyjW5LIiSpFxigaTIAkWRiKyQhawkUVZKCcVCEbIQUXJZuGdDuUShkIjI65IiFLHAv+8z5zfOnDkzc/xf8xpv86nT8TzPmfNcvr/L88xw+P378p3sfCtvb2+0sbFB3d3ddHR0RAUFBVRcXEzOzs7SE6b5Jd3tfCNnZ2e0trZG7e3tNDQ0RPv7+3RwcCC1mscuoA0QGBhIlZWV5OLiQt7e3hQSEkLPz89Sq3nsAtoYV1dX9PDwQKGhoVKNeewC2hAQbnZ2lkpKSsjDw0OqNc8/IeDp6SkVFhbS9va2VGP7YKzT09NSiejp6YnGx8cpOzubfHx8pFqinp4eamxspJeXF6nGEFUB8aHY2FhxoSN8GC9BGQuFBbMGmJBaH6bqAdoGBgaor6+PIiMjpdqPz/CFOSlh4fkZ+YJqBe+19DmsoXwsuOBl/v7+ov319ZVGRkYoKSmJPD096eLighYXF0VbaWkpFRUVUVVVleq6qwqILWxOTg41NDSIRXF0dBQvQVyuqakRSdcapKSkiH6xA9vb25NqP+oxLnnfmNDS0hJVVFSIMTJY1PPzc7E1x9Xb20udnZ0GHorP1tbWivnwM/X19Zq9mMXHe7UQHx9PCwsL+jHhYoNDn4ODg5SXlyfEzcrKosfHR9EGMOeysjJqaWmh+/t7qVaHqoBYjOjoaLEIAB4IK8dk5Vb+1fDOC2Jtbm4ahA1XV1cKDw+XSh9jgtW6ublJtTpgtbiYoKAgsYCwbGZ+fp4iIiIoLCxMlHFHv+vr66JsDvb6trY28d4/JSYmhmZmZgzETU9Pl1p1YHx+fn60vLws1egwmQOxWFtbW8IbWltbKTMzU5N4HLrU4jYszZyFn5yciPiPvnZ2dsSODPDd19dX3AHqIIhcVK1gXNfX16Iv9lzcUcb4lFauBItbV1dn4PXWhp1KadgmBYTbRkVFiTChVTwWBxaExYDw8s52d3fJ3d1dKhkDQQICAoTHeHl56cPo3d2dOCPJFwx1Dg4OZt/HwGphvQjFAJ5+eXkp+pKjLH8lKysrlJqaqs+BajnZEsiZGLf8jGhSQFghBEGIwIJq4fj4mBISEsTfCGFyETkBm8qfeObw8FB4FEIiDGZqakqMA2EtLi5OelIHxIYoTk5OUo06iAiwWmwC/qbHyMFc5OGRc/JnN00w1vf3d2G8jKqAWLSmpiZ9HkFoswQEwA5Kno9YxMTERJEzcnNzpRZjEBJxsUelpaXRzc2N+FoJW2wtnqYEBqgmHkSH+JzjGZS1GMWfwvlWGQ61cHt7a15AvLCjo4Py8/OF5WRkZNDk5KTFjrBAycnJUukDiAirs5QzMKjg4GC9ASDfYZPR39+vL38GiIdxs3gwyrGxMdGGMgwLeZDnhbsyL1qb/9MXnERuzEYCYsGQLDnnIaQhXPFGwlogTMpzECaGcayurhrlP6CWDxiE6+HhYYPjBaIIPJpBSB4dHRUeDnDHxgmeDyA4vp/8bJgDfMSAEcEwsKGTvwd9oW9lWrCEWt7XC8gDRmxWHh+wiGpnkK8Ck0O/MB7OlQD5FDlYbaJq+QDwmOfm5gw2DTg4y4GB4pyLem7XesZlgfB+bE5wfrS0MeFnuC/kQXYSrSjzPub6Y38PxOCxQYKXKs9MXwFE6urqEqIqz5nfgdp8UWdyF2rrIDTieMM71a8ECzMxMUHl5eU2IR5A2EXKQFRisAY//hd5WzgmWBtEg+bmZqqurjYK8f/Ev1Rggvy95mfziq2DvIrdsSkDtf9PzA/nx+ZAOzrsAv5oiP4Dz1wTR9Sa5YMAAAAASUVORK5CYII=',
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
  teachingTime: [],
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

const birthday = ref()

const teachingTime = ref(Array(3).fill([]).map(it => Array(7)))

const filelist = ref<FileItem[]>()

function beforeUpload(_: any, options: UploadOptions) {

  ploadFilePromise(options.filePath!).then(base64 => {
    options.onSuccess?.(null as any, options)
    filelist.value = [{
      name: '文件3.png',
      status: 'success',
      message: '上传中...',
      url: base64,
    }]
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

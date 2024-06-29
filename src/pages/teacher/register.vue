<template>
  <nut-form ref="formRef" label-position="top" :model-value="form">
    <nut-form-item>
      <view class="text-lg font-600">个人信息</view>
    </nut-form-item>
    <nut-form-item label="个人证件照" :rules="[{ required: true, message: '个人证件照不能为空' }]">
      <nut-uploader v-model:file-list="filelist" :maximum="1" :before-upload="beforeUpload" />
    </nut-form-item>
    <nut-form-item label="姓名" :rules="[{ required: true, message: '姓名不能为空' }]">
      <nut-input v-model="form.name" />
    </nut-form-item>
    <nut-form-item label="生日" :rules="[{ required: true, message: '生日不能为空' }]">
      <sar-datetime-picker-input v-model="birthday" placeholder="请选择" />
    </nut-form-item>
    <nut-form-item label="联系方式" :rules="[{ required: true, message: '联系不能为空' }]">
      <nut-input v-model="form.phone" />
    </nut-form-item>
    <nut-form-item label="毕业学校" :rules="[{ required: true, message: '毕业不能为空' }]">
      <nut-input v-model="form.school" />
    </nut-form-item>
    <nut-form-item label="专业" :rules="[{ required: true, message: '专业不能为空' }]">
      <nut-input v-model="form.major" />
    </nut-form-item>
    <nut-form-item label="教龄" :rules="[{ required: true, message: '教龄不能为空' }]">
      <sar-picker-input v-model="form.tutorAge" :columns="dataList?.tutor_age" placeholder="请选择" />
    </nut-form-item>
    <nut-form-item>
      <view class="text-lg font-600">教员信息</view>
    </nut-form-item>
    <nut-form-item label="任教对象" :rules="[{ required: true, message: '任教对象不能为空' }]">
      <nut-checkbox-group v-model="form.teachingStyle">
        <nut-checkbox label="机构">机构</nut-checkbox>
        <nut-checkbox label="个人">个人</nut-checkbox>
      </nut-checkbox-group>
    </nut-form-item>
    <nut-form-item label="任教方式" :rules="[{ required: true, message: '任教方式不能为空' }]">
      <nut-checkbox-group v-model="form.teachingStyle">
        <nut-checkbox label="线上">线上</nut-checkbox>
        <nut-checkbox label="线下">线下</nut-checkbox>
      </nut-checkbox-group>
    </nut-form-item>
    <nut-form-item label="任教时间">
      <table class="w-full">
        <tr>
          <th />
          <th v-for="d in '一二三四五六日'" :key="d">周{{ d }}</th>
        </tr>
        <tr v-for="(period, pi) in ['上午', '下午', '晚上']" :key="period">
          <th>{{ period }}</th>
          <th v-for="(d, index) in '一二三四五六日'" :key="d">
            <Checkbox v-model="form.teachingTime[pi]" :value="index + 1" />
          </th>
        </tr>
      </table>
    </nut-form-item>
    <nut-form-item label="课酬要求" :rules="[{ required: true, message: '课酬要求不能为空' }]">
      <sar-picker-input v-model="form.cost" :columns="dataList?.cost" />
    </nut-form-item>
    <nut-form-item label="任教区域" :rules="[{ required: true, message: '任教区域不能为空' }]">
      <sar-picker-input title="选择任教区域" v-model="form.address" :columns="dataList?.teachingPosition" />
    </nut-form-item>
    <nut-form-item label="教学位置" :rules="[{ required: true, message: '教学位置不能为空' }]">
      <nut-input v-model="form.address" />
    </nut-form-item>
    <nut-form-item label="任教科目">
      <template #label>
        <view class="flex justify-between">
          <view>任教科目</view>
          <nut-button type="primary" size="mini" @click="subjectVisible = true">添加任职经历</nut-button>
        </view>
        <view class="my-2 flex justify-between" v-for="(item, index) in form.personalExperience">
          <view>{{ item }}</view>
          <view class="color-red" @click="form.personalExperience.splice(index, 1)">删除</view>
        </view>
      </template>
    </nut-form-item>
    <nut-form-item label="任教经历">
      <template #label>
        <view class="flex justify-between">
          <view>任教经历</view>
          <nut-button type="primary" size="mini" @click="show">添加任职经历</nut-button>
        </view>
        <view class="my-2 flex justify-between" v-for="(item, index) in form.achievement">
          <view>{{ item }}</view>
          <view class="color-red" @click="form.achievement.splice(index, 1)">删除</view>
        </view>
      </template>
    </nut-form-item>
    <nut-form-item label="自我描述" :rules="[{ required: true, message: '自我描述不能为空' }]">
      <nut-textarea v-model="form.introduction" />
      <view class="mt-4">
        <nut-button type="primary" block @click="register">确认注册</nut-button>
      </view>
    </nut-form-item>
    <nut-form-item>
      <nut-checkbox v-model="agreement" class="my-2">
        <navigator url="/pages/about/agreement">
          我已阅读并同意 《用户服务协议》及《隐私协议》
        </navigator>
      </nut-checkbox>
    </nut-form-item>
  </nut-form>
  <sar-popout v-model:visible="subjectVisible" title="请选择任教科目">
    <sar-cascader v-model="subject" :options="subjectsData" />
  </sar-popout>
  <sar-popout v-model:visible="recordVisible" title="请填写所获证书" @confirm="add">
    <nut-form ref="recordRef" :model-value="record">
      <nut-form-item label="日期" prop="date" :rules="[{ required: true, message: '日期不能为空' }]">
        <sar-datetime-picker-input v-model="record.date" type="yM" />
      </nut-form-item>
      <nut-form-item label="比赛" prop="location" :rules="[{ required: true, message: '比赛不能为空' }]">
        <nut-input v-model="record.location" />
      </nut-form-item>
      <nut-form-item label="奖项" prop="prix" :rules="[{ required: true, message: '奖项不能为空' }]">
        <nut-input v-model="record.prix" />
      </nut-form-item>
    </nut-form>
  </sar-popout>
</template>

<script setup lang="ts">
import type { FileItem, FormInst, UploadOptions } from 'nutui-uniapp'
import Checkbox from '@/components/Checkbox.vue'
import { ploadFilePromise } from '@/utls/image-tools';
import { listData } from '@/store';
import { formatM } from '@/utls';

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

const subject = ref();
const subjectVisible = ref(false);
const subjectsData = computed(() => {
  return dataList.value?.subjects.map(it => {
    return {
      label: it.name,
      value: it.name,
      children: it.children.map((it1) => {
        return {
          label: it1.subject,
          value: `${it} ${it1.subject}`
        }
      })
    }
  })
})

const record = ref({
  date: undefined,
  location: "",
  prix: ""
})
const recordRef = ref<FormInst>();
const recordVisible = ref(false)

function show() {
  record.value = {
    date: undefined,
    location: "",
    prix: ""
  }
  recordVisible.value = true;
}

function add() {
  recordRef.value!.validate().then(({ valid }) => {
    if (valid) {
      const { date, location, prix } = record.value;
      // @ts-ignore
      const str = `${formatM(date)} ${location} ${prix}`
      form.value.achievement.push(str)
    } else {
      recordVisible.value = true
    }
  })
}


const agreement = ref(false)

const birthday = ref()

//上传
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

const formRef = ref<FormInst>()

function register() {
  return formRef.value!.validate().then(({ valid }) => {
    if (valid) {
    }
  })
}
</script>

<style>
.nut-form {
  --nut-cell-desc-color: black
}

.nut-form-item__top {
  .nut-form-item {
    padding-right: unset !important;
  }

  .nut-form-item__label {
    padding-right: unset !important;
  }
}

th {
  padding: 16rpx;
  border-bottom: 1px #ebeef5 solid;
  border-right: 1px #ebeef5 solid;
}
</style>

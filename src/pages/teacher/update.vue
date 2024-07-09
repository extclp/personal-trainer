<template>
  <nut-form ref="formRef" label-position="top" :model-value="form">
    <view class="text-lg font-500">个人信息</view>
    <nut-form-item label="个人证件照" prop="image" :rules="[{ required: true, message: '个人证件照不能为空' }]">
      <nut-uploader v-model:file-list="filelist" :maximum="1" :before-upload="beforeUpload" />
    </nut-form-item>
    <nut-form-item label="姓名" prop="name" :rules="[{ required: true, message: '姓名不能为空' }]">
      <nut-input v-model="form.name" placeholder="请填写" />
    </nut-form-item>
    <nut-form-item label="生日" prop="birthday" :rules="[{ required: true, message: '生日不能为空' }]">
      <sar-datetime-picker-input v-model="birthday" placeholder="请选择" :min="new Date(1940, 1, 1)" :max="new Date()" />
    </nut-form-item>
    <nut-form-item label="联系方式" prop="phone" :rules="[{ required: true, message: '联系不能为空' }]">
      <nut-input v-model="form.phone" placeholder="请填写" />
    </nut-form-item>
    <nut-form-item label="毕业学校" prop="school" :rules="[{ required: true, message: '毕业不能为空' }]">
      <nut-input v-model="form.school" placeholder="请填写" />
    </nut-form-item>
    <nut-form-item label="专业" prop="major" :rules="[{ required: true, message: '专业不能为空' }]">
      <nut-input v-model="form.major" placeholder="请填写" />
    </nut-form-item>
    <nut-form-item label="教龄" prop="tutorAge" :rules="[{ required: true, message: '教龄不能为空' }]">
      <sar-picker-input v-model="form.tutorAge" :columns="dataList?.tutor_age" placeholder="请选择" />
    </nut-form-item>
    <nut-form-item label="身份" prop="identity" :rules="[{ required: true, message: '身份不能为空' }]">
      <sar-picker-input v-model="form.identity" :columns="dataList?.identity" placeholder="请选择" />
    </nut-form-item>
    <view class="text-lg font-500">教员信息</view>
    <nut-form-item label="任教对象" prop="student" :rules="[{ required: true, message: '任教对象不能为空' }]">
      <nut-radio-group v-model="form.student">
        <nut-radio label="机构">机构</nut-radio>
        <nut-radio label="个人">个人</nut-radio>
      </nut-radio-group>
    </nut-form-item>
    <nut-form-item label="任教方式" prop="teachingStyle" :rules="[{ required: true, message: '任教方式不能为空' }]">
      <nut-checkbox-group v-model="form.teachingStyle">
        <nut-checkbox label="线上">线上</nut-checkbox>
        <nut-checkbox label="线下">线下</nut-checkbox>
      </nut-checkbox-group>
    </nut-form-item>
    <nut-form-item label="任教时间">
      <view class="table-border w-full table table-auto text-center">
        <view class="table-row">
          <view class="table-cell py-2" />
          <view v-for="d in '一二三四五六日'" :key="d" class="table-cell py-2">周{{ d }}</view>
        </view>
        <view v-for="(period, pi) in ['上午', '下午', '晚上']" :key="period" class="table-row">
          <view class="table-cell p-2">{{ period }}</view>
          <view v-for="(d, index) in '一二三四五六日'" :key="d" class="table-cell p-2">
            <Checkbox v-model="form.teachingTime[pi]" :value="index + 1" />
          </view>
        </view>
      </view>
    </nut-form-item>
    <nut-form-item label="课酬要求" prop="form.cost" :rules="[{ required: true, message: '课酬要求不能为空' }]">
      <sar-picker-input v-model="form.cost" placeholder="请选择" :columns="dataList?.cost" />
    </nut-form-item>
    <nut-form-item label="任教区域" prop="teachingPosition" :rules="[{ required: true, message: '任教区域不能为空' }]">
      <template #label>
        <nut-button type="primary" size="mini" class="float-right" @click="showPostion">添加任职区域</nut-button>
        <text>任教区域</text>
      </template>
      <view v-for="(item, index) in form.teachingPosition" class="my-2 flex justify-between">
        <view>{{ item }}</view>
        <view class="color-red" @click="form.teachingPosition.splice(index, 1)">删除</view>
      </view>
    </nut-form-item>
    <nut-form-item label="教学位置" prop="address" :rules="[{ required: true, message: '教学位置不能为空' }]">
      <nut-input v-model="form.address" placeholder="请选择" />
    </nut-form-item>
    <nut-form-item label="任教科目" prop="personalExperience">
      <template #label>
        <nut-button type="primary" size="mini" class="float-right" @click="showSubject">添加任职经历</nut-button>
        <text>任教科目</text>
      </template>
      <view v-for="(item, index) in form.personalExperience" class="my-2 flex justify-between">
        <view>{{ item }}</view>
        <view class="color-red" @click="form.personalExperience.splice(index, 1)">删除</view>
      </view>
    </nut-form-item>
    <nut-form-item prop="achievement" label="任教经历">
      <template #label>
        <nut-button type="primary" size="mini" class="float-right" @click="show">添加任职经历</nut-button>
        <text>任教经历</text>
      </template>
      <view v-for="(item, index) in form.achievement" class="my-2 flex justify-between">
        <view>{{ item }}</view>
        <view class="color-red" @click="form.achievement.splice(index, 1)">删除</view>
      </view>
    </nut-form-item>
    <nut-form-item label="自我描述" prop="introduction" :rules="[{ required: true, message: '自我描述不能为空' }]">
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
  <sar-popout v-model:visible="positionVisible" title="请选择任教科目" @confirm="onSelectPostion">
    <sar-picker v-model="postion" title="选择任教区域" :columns="dataList?.teachingPosition" />
  </sar-popout>
  <sar-popout v-model:visible="subjectVisible" title="请选择任教科目" @confirm="onSelectSubject">
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
import { ploadFilePromise } from '@/utls/image-tools'
import { listData } from '@/store'
import { format, formatM } from '@/utls'
import type { TeacherForm } from '@/api/interfaces'
import { teacherDetail, teacherUpdate } from '@/api'

const dataList = listData()

const form = ref<TeacherForm>({
  phone: '',
  name: '',
  sex: '',
  school: '',
  major: '',
  birthday: '',
  tutorAge: '',
  image: '',
  identity: '',
  teachingCourse: [],
  teachingPosition: [],
  student: '',
  teachingStyle: [],
  teachingTime: Array(3),
  address: '',
  cost: '',
  introduction: '',
  personalExperience: [],
  achievement: [],
  costRequest: '',

})

const birthday = ref()
watch(birthday, () => {
  form.value.birthday = format(birthday.value)
})

const postion = ref<string>()
const positionVisible = ref()
function showPostion() {
  postion.value = undefined
  positionVisible.value = true
}
function onSelectPostion() {
  form.value.teachingPosition.push(postion.value!)
}

const subject = ref()
const subjectVisible = ref(false)
const subjectsData = computed(() => {
  return dataList.value?.subjects.map((it) => {
    return {
      label: it.name,
      value: it.name,
      children: it.children.map((it1) => {
        return {
          label: it1.subject,
          value: `${it.name}  ${it1.subject}`,
        }
      }),
    }
  })
})
function showSubject() {
  subject.value = undefined
  subjectVisible.value = true
}
function onSelectSubject() {
  form.value.personalExperience.push(subject.value!)
}

// 任教经历
const record = ref({
  date: undefined,
  location: '',
  prix: '',
})
const recordRef = ref<FormInst>()
const recordVisible = ref(false)

function show() {
  record.value = {
    date: undefined,
    location: '',
    prix: '',
  }
  recordVisible.value = true
}

function add() {
  recordRef.value!.validate().then(({ valid }) => {
    if (valid) {
      const { date, location, prix } = record.value
      // @ts-expect-error
      const str = `${formatM(date)} ${location} ${prix}`
      form.value.achievement.push(str)
    }
    else {
      recordVisible.value = true
    }
  })
}

const agreement = ref(false)

// 上传
const filelist = ref<FileItem[]>()

function beforeUpload(_: any, options: UploadOptions) {
  ploadFilePromise(options.filePath!).then((base64) => {
    options.onSuccess?.(null as any, options)
    form.value.image = base64
    filelist.value = [{
      name: '文件3.png',
      status: 'success',
      message: '上传中...',
      url: base64,
      type: 'image',
    }]
  })
}

const formRef = ref<FormInst>()

function register() {
  if (!agreement.value) {
    uni.showToast({ icon: 'error', title: '请先同意协议' })
    return
  }
  return formRef.value!.validate().then(({ valid }) => {
    if (valid) {
      teacherUpdate(form.value).then(() => {
        uni.showToast({ title: '更新资料成功' })
      })
    }
  })
}

teacherDetail({ phone: uni.getStorageSync('phone') }).then((resp) => {
  form.value = resp.data.teacher_detail

  filelist.value = [{
    name: '文件3.png',
    status: 'success',
    message: '上传中...',
    url: form.value.image,
    type: 'image',
  }]
})
</script>

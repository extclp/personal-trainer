<template>
  <nut-form ref="formRef" label-position="top" :model-value="form" :rules="rules">
    <view class="m-2 text-lg">学员信息</view>
    <nut-form-item label="联系方式" prop="phone">
      <nut-input v-model="form.phone" placeholder="请填写" />
    </nut-form-item>
    <nut-form-item label="学员姓名" prop="studentName">
      <nut-input v-model="form.studentName" placeholder="请填写" />
    </nut-form-item>
    <nut-form-item label="学员性别" prop="studentSex">
      <PickerInput v-model="form.studentSex" :columns="['男', '女']" placeholder="请填写" />
    </nut-form-item>
    <nut-form-item label="学员成绩" prop="studentGrade">
      <PickerInput v-model="form.studentGrade" :columns="dataList?.student_grade" placeholder="请选择" />
    </nut-form-item>
    <view class="m-2 text-lg">教员要求</view>
    <nut-form-item label="教员类型" prop="student" :rules="[{ required: true, message: '任教对象不能为空' }]">
      <nut-radio-group v-model="form.student">
        <nut-radio label="机构">机构</nut-radio>
        <nut-radio label="个人">个人</nut-radio>
      </nut-radio-group>
    </nut-form-item>
    <nut-form-item label="教员身份">
      <PickerInput v-model="form.identity" :columns="['大学生教员', '研究生教员', '专业教员']" placeholder="请选择" />
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
          <view class="table-cell py-2">{{ period }}</view>
          <view v-for="(d, index) in '一二三四五六日'" :key="d" class="table-cell py-2">
            <Checkbox v-model="form.teachingTime[pi]" :value="index + 1" />
          </view>
        </view>
      </view>
    </nut-form-item>
    <nut-form-item label="课酬要求" prop="cost" :rules="[{ required: true, message: '课酬要求不能为空' }]">
      <PickerInput v-model="form.cost" :columns="dataList?.cost" placeholder="请选择" />
    </nut-form-item>
    <nut-form-item label="教学区域" prop="teachingPosition" :rules="[{ required: true, message: '任教区域不能为空' }]">
      <PickerInput v-model="form.teachingPosition" :columns="dataList?.teachingPosition" placeholder="请选择" />
    </nut-form-item>
    <nut-form-item label="教学位置" prop="address" :rules="[{ required: true, message: '教学位置不能为空' }]">
      <nut-input v-model="form.address" placeholder="请填写" />
    </nut-form-item>
    <nut-form-item label="教学科目" prop="teachingCourse" :rules="[{ required: true, message: '教学位置不能为空' }]">
      <sar-cascader-input v-model="form.teachingCourse" :options="subjectsData" placeholder="请选择" />
    </nut-form-item>
    <nut-form-item label="要求" prop="request" :rules="[{ required: true, message: '要求不能为空' }]">
      <nut-textarea v-model="form.request" placeholder="请填写" />
    </nut-form-item>

    <view class="m-4">
      <nut-checkbox v-model="agreement" class="my-2">
        <navigator url="/pages/about/agreement">
          我已阅读并同意 《用户服务协议》及《隐私协议》
        </navigator>
      </nut-checkbox>
      <nut-button type="primary" block @click="handleSubmit">确认发布</nut-button>
    </view>
  </nut-form>
</template>

<script setup lang="ts">
import type { FormInst } from 'nutui-uniapp'
import Checkbox from '@/components/Checkbox.vue'
import { createOrder } from '@/api'
import { listData } from '@/store'
import PickerInput from '@/components/PickerInput.vue'

const dataList = listData()

const agreement = ref(false)

const rules = {
  studentName: [{ required: true, message: '学生姓名不能为空' }],
  phone: [{ required: true, message: '联系方式不能为空' }],
  studentSex: [{ required: true, message: '学生性别不能为空' }],
  studentGrade: [{ required: true, message: '学生成绩不能为空' }],
  identity: [{ required: true, message: '教员类型不能为空' }],
}

function defaultForm() {
  return {
    phone: '',
    identity: '',
    teachingCourse: undefined,
    teachingPosition: '',
    student: '',
    teachingStyle: [],
    teachingTime: Array(3).fill([]).map(() => []),
    cost: '',
    address: '',
    studentName: '',
    studentSex: '',
    studentGrade: '',
    request: '',
  }
}

const form = ref(defaultForm())

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
const formRef = ref<FormInst>()

function handleSubmit() {
  if (!agreement.value) {
    uni.showToast({ icon: 'error', title: '请先同意协议' })
    return
  }
  return formRef.value!.validate().then(({ valid }) => {
    if (!valid) {
      return
    }
    createOrder(form.value).then(() => {
      form.value = defaultForm()
      uni.showToast({ title: '发布成功' })
      uni.switchTab({ url: '/pages/home' })
    })
  })
}
</script>

<template>
  <nut-form ref="formRef" label-position="top" :model-value="form">
    <nut-form-item>
      <view class="text-lg font-600">学员信息</view>
    </nut-form-item>
    <nut-form-item label="学员姓名">
      <nut-input v-model="form.phone" placeholder="请填写" />
    </nut-form-item>
    <nut-form-item label="联系方式">
      <nut-input v-model="form.phone" placeholder="请填写" />
    </nut-form-item>
    <nut-form-item label="学员性别">
      <sar-picker-input v-model="form.studentSex" :columns="['男', '女']" placeholder="请填写" />
    </nut-form-item>
    <nut-form-item label="学员成绩">
      <sar-picker-input v-model="form.studentGrade" :columns="dataList?.student_grade" placeholder="请选择" />
    </nut-form-item>
    <nut-form-item>
      <view class="text-lg font-600">教员要求</view>
    </nut-form-item>
    <nut-form-item label="任教对象">
      <sar-picker-input v-model="form.student" :columns="['大学生教员', '研究生教员', '专业教员']" placeholder="请选择" />
    </nut-form-item>
    <nut-form-item label="任教方式" prop="teachingStyle" :rules="[{ required: true, message: '任教方式不能为空' }]">
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
    <nut-form-item label="课酬要求" prop="form.cost" :rules="[{ required: true, message: '课酬要求不能为空' }]">
      <sar-picker-input v-model="form.cost" :columns="dataList?.cost" placeholder="请选择" />
    </nut-form-item>
    <nut-form-item label="教学区域" prop="teachingPosition" :rules="[{ required: true, message: '任教区域不能为空' }]">
      <sar-picker-input v-model="form.teachingPosition" :columns="dataList?.teachingPosition" placeholder="请选择" />
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
    <nut-form-item>
      <nut-checkbox v-model="agreement" class="my-2">
        <navigator url="/pages/about/agreement">
          我已阅读并同意 《用户服务协议》及《隐私协议》
        </navigator>
      </nut-checkbox>
      <view class="my-4">
        <nut-button type="primary" block @click="handleSubmit">确认发布</nut-button>
      </view>
    </nut-form-item>
  </nut-form>
</template>

<script setup lang="ts">
import Checkbox from '@/components/Checkbox.vue'
import { createOrder } from '@/api'
import { listData } from '@/store'

const dataList = listData()

const agreement = ref(false)

const form = reactive({
  phone: '',
  teachingCourse: undefined,
  teachingPosition: '',
  student: '',
  teachingStyle: [],
  teachingTime: Array(3),
  cost: '',
  address: '',
  studentName: '',
  studentSex: '',
  studentGrade: '',
  request: '',
})

const subjectsData = computed(() => {
  return dataList.value?.subjects.map((it) => {
    return {
      label: it.name,
      value: it.name,
      children: it.children.map((it1) => {
        return {
          label: it1.subject,
          value: `${it.name} ${it1.subject}`,
        }
      }),
    }
  })
})

function handleSubmit() {
  createOrder(form).then(() => {

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

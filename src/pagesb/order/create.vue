<template>
  <uni-forms :model="form">
    <uni-forms-item label="联系方式">
      <input v-model="form.phone">
    </uni-forms-item>
    <uni-forms-item label="任教方式">
      <radio-group v-model="form.student" label="任教方式">
        <radio value="机构">机构</radio>
        <radio value="个人">个人</radio>
      </radio-group>
    </uni-forms-item>
  </uni-forms>
</template>

<script setup lang="ts">
const form = reactive({
  phone: '',
  teachingCourse: '',
  teachingPosition: '',
  student: '',
  teachingStyle: [],
  teachingTime: [],
  costRequest: '',
  address: '',
  studentIntroduction: '',
  request: '',
})

function submit() {

}
</script>

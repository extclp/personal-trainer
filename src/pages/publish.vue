<template>
    <view class="p-4">
        <view class="py-2">联系方式</view>
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
            <navigator url="/pages/about/agreement">
                我已阅读并同意 《用户服务协议》及《隐私协议》
            </navigator>
        </nut-checkbox>
    </view>
</template>
<script setup lang="ts">

const agreement = ref(false)

const form = reactive({
    phone: "123456",
    teachingCourse: "学前  拼音",
    teachingPosition: "崇川",
    "student": "机构",
    "teachingStyle": [
        "线上"
    ],
    "teachingTime": [
        [
            7,
            3
        ],
        [
            1,
            3
        ]
    ],
    "cost": "80-100/h",
    "address": "地址xxxx",
    "studentName": "李子",
    "studentSex": "男",
    "studentGrade": "优秀",
    "request": "希望老师严厉一点。。。。"
})
</script>
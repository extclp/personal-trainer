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
                    <Checkbox v-model="form.teachingTime[pi]" :value="index + 1" />
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
        <view @click="a = true">添加任职经历</view>
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
import { teacherDetail } from '@/api';
import type { Teacher } from '@/api/interfaces';

const dataList = listData();

const form = ref({
    teachingTime: Array(3).fill([]).map(() => Array(7))
} as Teacher)

teacherDetail({ phone: '17739696712' }).then(resp => {
    form.value = resp.data.teacher_detail
})

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

//任职经历
const a = ref(false)
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
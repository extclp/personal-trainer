<template>
  <view v-if="data" class="page flex-col">
    <view class="flex-1 flex-col">
      <view class="section_4 relative flex-col justify-start">
        <view class="section_5" />
        <view class="group_5 pos_3 flex-col text-center">
          <image class="image_8 shrink-0" :src="data.image" />
          <view class="section_6 relative flex-col items-center">
            <view class="text_2">姓名：{{ data.name }}</view>
            <image class="image_9 mt-7" :src="data.qr_code_path" />
            <view>{{ data.login_time }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { type QrcodeData, teacherQRcode } from '@/api/teacher'

const data = ref<QrcodeData>()

teacherQRcode({
  phone: localStorage.getItem('token'),
}).then((resp) => {
  data.value = resp.data
})
</script>

<style lang="scss">
.page {
  height: 100%;
  background-color: #f4f4f4;

  .section_4 {

    .section_5 {
      background-color: #fb7206;
      height: 288.46rpx;
    }

    .group_5 {
      height: 1358.75rpx;
      width: 648.54rpx;

      .image_8 {
        border-radius: 19.89rpx;
        width: 648.54rpx;
        height: 742.04rpx;
      }

      .section_6 {
        margin-top: -107.43rpx;
        padding: 55.7rpx 0 135.28rpx;
        background-color: #fb7206;
        border-radius: 19.89rpx;

        .text_2 {
          color: #ffffff;
          font-size: 39.79rpx;
          font-family: Noto Sans SC;
          line-height: 36.84rpx;
          text-align: center;
        }

        .image_9 {
          border-radius: 19.89rpx;
          width: 453.58rpx;
          height: 453.58rpx;
        }
      }
    }

    .pos_3 {
      position: absolute;
      left: 50%;
      top: 53.71rpx;
      transform: translateX(-50%);
    }
  }
}
</style>

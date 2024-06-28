<template>
  <view class="page flex-col">
    <view class="group_4 flex-1 flex-col">
      <view class="section_4 relative flex-col justify-start">
        <view class="section_5" />
        <view class="group_5 pos_3 flex-col text-center">
          <image class="image_8 shrink-0" src="@/static/1a030d1133e460f7ff4569560af56215.png" />
          <view class="section_6 relative flex-col items-center">
            <view class="text_2">姓名：赵钱孙李</view>
            <image class="image_9 mt-22" src="@/static/454e87fe88174cb80b040dcaab25109e.png" />
          </view>
        </view>
      </view>
      <view class="section_7 relative shrink-0" />
    </view>
  </view>
</template>

<style scoped lang="scss">
.page {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;

  .group_4 {
    overflow-y: auto;

    .section_4 {
      padding-bottom: 1269.23rpx;
      background-color: #f4f4f4;

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

    .section_7 {
      margin-top: -37.8rpx;
      background-color: #ffffff;
      overflow: hidden;
      height: 67.64rpx;
    }
  }
}
</style>

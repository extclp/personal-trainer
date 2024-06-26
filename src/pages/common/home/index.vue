<template>
  <view v-if="data">
    <swiper>
      <swiper-item v-for="image in data.image">
        <image :src="image" />
      </swiper-item>
    </swiper>
    <<wd-notice-bar :text="data.announcement" />
  </view>
</template>

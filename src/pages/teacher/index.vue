<template>
  <view class="flex h-full flex-col">
    <view>
      <sar-dropdown>
        <sar-dropdown-item label="教龄" :options="makeLV(dataList?.tutor_age)" @update:model-value="search" />
        <sar-dropdown-item label="区域" :options="makeLV(dataList?.teachingPosition)" @update:model-value="search" />
        <sar-dropdown-item v-model="form.teaching_position" label="价格" :options="makeLV(dataList?.cost)"
          @update:model-value="search" />
      </sar-dropdown>
    </view>
    <scroll-view scroll-y @scrolltolower="loadMore" class="flex-1 overflow-hidden">
      <sar-card class="m4" v-for="item in data">
        <view class="flex gap-2">
          <view class="text-center">
            <nut-avatar class="mb-2" :size="70" />
            <view>最近登录</view>
            <view>{{ item.login_time }}</view>
          </view>
          <view class="flex-1">
            <text class="float-right">
              <text class="text-primary">¥110</text>
              <text class="text-[#AAA6B9]">/小时</text>
            </text>
            <text>朱飒</text>
            <nut-tag type="primary" class="ml2">研究生教员</nut-tag>
            <view class="mt-6">
              <text class="w-8 text-primary">科目：</text>
              <text>初中数学</text>
            </view>
            <view class="mt-2">
              <text class="w-8 text-primary">地区：</text>
              <text>崇川区</text>
            </view>
          </view>
        </view>
        <view class="mt-2 flex gap-2">
          <nut-tag type="primary">{{ item.school }}</nut-tag>
          <nut-tag type="primary">数学师范 研究生</nut-tag>
        </view>
      </sar-card>
      <sar-load-more :status="loadMoreStautus" />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { teachers } from '@/api'
import type { Teacher } from '@/api/interfaces';
import { listData } from '@/store';
import { makeLV } from '@/utls';
import type { LoadMoreStatus } from 'sard-uniapp';

const dataList = listData();

const form = ref({
  page: 1,
  per_page: 10,
  all: '',
  subjects: '',
  identity: '',
  teaching_type: '',
  teaching_position: '幸福附近',
})

const data = ref<Teacher[]>([]);

const loadMoreStautus = ref<LoadMoreStatus>("incomplete")

function getList() {
  loadMoreStautus.value = 'loading'
  teachers(form).then((resp) => {
    const list = resp.data.teachers;
    data.value.push(...list)
    if (list.length == 0) {
      loadMoreStautus.value = 'complete'
    } else {
      loadMoreStautus.value = 'incomplete'
    }
  })
}
getList()

function loadMore() {
  if (loadMoreStautus.value != 'complete') {
    form.page++
    getList();
  }
}

function search() {
  form.page = 1;
  getList()
}
</script>

<template>
  <scroll-view clas="h-full" @scrolltolower="loadMore">
    <sar-card v-for="item in data" class="m-4">
      <view class="flex justify-between text-lg font-semibold">
        <view>学员：朱珠</view>
        <text class="text-primary">{{ item.cost }}</text>
      </view>
      <view>
        <text>任教科目：</text>
        {{ item.subject }}
      </view>
      <view>
        <text>课时： </text>
        {{ item.course_time }}
      </view>
      <view class="flex justify-between">
        <view>
          <text>匹配教师：</text>
          {{ item.teacher }}
        </view>
        <nut-tag>{{ item.status }}</nut-tag>
      </view>
      <template #footer>
        <view class="flex justify-end gap2">
          <navigator :url="`/order/commit?phone=${item.phone}`">
            <nut-button type="primary" size="mini">评价教师</nut-button>
          </navigator>
        </view>
      </template>
    </sar-card>
    <sar-load-more :status="loadMoreStautus" />
  </scroll-view>
</template>

<script setup lang="ts">
import type { LoadMoreStatus } from 'sard-uniapp'
import type { Order } from '@/api/interfaces'
import { orderList } from '@/api/teacher'

const data = ref<Order[]>([])

const loadMoreStautus = ref<LoadMoreStatus>('incomplete')

const form = reactive({
  key: 0,
  page: 1,
  per_page: 10,
  phone: uni.getStorageSync('phone'),
})

function getList() {
  loadMoreStautus.value = 'loading'
  orderList(form).then((resp) => {
    const list = resp.data.orders
    data.value.push(...list)
    if (list.length == 0) {
      loadMoreStautus.value = 'complete'
    }
    else {
      loadMoreStautus.value = 'incomplete'
    }
  })
}
getList()

function loadMore() {
  if (loadMoreStautus.value != 'complete') {
    form.page++
    getList()
  }
}

function search() {
  form.page = 1
  getList()
}
</script>

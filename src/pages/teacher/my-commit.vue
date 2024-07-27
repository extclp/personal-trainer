<template>
  <nut-search-bar placeholder="根据用户名/评价内容查找评价" v-model="form.name" @change="getList" />
  <sar-card v-for="item in data" :key="item.time" class="m-4">
    <view class="flex gap-4">
      <image class="mt-2 h-10 w-10 rounded-full" :src="item.image" />
      <view class="flex-1">
        <view class="text-sm">
          <text class="float-right">{{ ago(item.time) }}</text>
          <text>{{ item.phone }}</text>
        </view>
        <view class="my-3">{{ item.content }}</view>
      </view>
    </view>
  </sar-card>
</template>

<script setup lang="ts">
import { search } from '@/api'
import type { Commit } from '@/api/interfaces'
import { ago } from '@/utls';

const data = ref<Commit[]>([])

const form = reactive({
  name: "",
  phone: uni.getStorageSync('phone')
})

function getList() {
  search(form).then((resp) => {
    data.value = resp.data
  })
}
getList();
</script>

<template>
  <view class="h-full flex flex-col">
    <view>
      <!-- 科目 对线 线上 区域 -->
      <sar-dropdown>
        <DropdownSelect v-model="form.subjects" placeholder="科目" :options="subjectsData" />
        <sar-dropdown-item v-model="form.identity" placeholder="身份" :options="makeLV(['研究生教员', '本科生教员', '专业教员'])" />
        <sar-dropdown-item v-model="form.teaching_type" placeholder="线上/下" :options="makeLV(['线上', '线下'])" />
        <sar-dropdown-item
          v-model="form.teaching_position" placeholder="区域"
          :options="makeLV(dataList?.teachingPosition)"
        />
      </sar-dropdown>
    </view>
    <scroll-view scroll-y class="flex-1 overflow-hidden" @scrolltolower="loadMore">
      <navigator v-for="item in data" :key="item.phone" :url="`/pages/teacher/detail?phone=${item.phone}`">
        <sar-card class="m4">
          <view class="flex gap-2">
            <view class="text-center">
              <image class="mb-2 size-18 rounded-full" :src="item.image" mode="aspectFill" />
              <view class="text-xs text-[#AAA6B9]">最近登录</view>
              <view class="mt-1 text-xs text-[#AAA6B9]">{{ item.login_time }}</view>
            </view>
            <view class="flex-1">
              <text class="float-right text-primary">{{ item.costRequest }}</text>
              <text>{{ item.name }}</text>
              <view class="mt-6">
                <text class="w-8 text-primary">科目：</text>
                <text>{{ item.subject.join(", ") }}</text>
              </view>
              <view class="mt-2">
                <text class="w-8 text-primary">地区：</text>
                <text>{{ item.teachingPosition.join(", ") }}</text>
              </view>
            </view>
          </view>
          <view class="mt-2 flex gap-2">
            <nut-tag type="primary">{{ item.school }}</nut-tag>
            <nut-tag type="primary">{{ item.identity }}</nut-tag>
          </view>
        </sar-card>
      </navigator>
      <sar-load-more :status="loadMoreStautus" />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import type { LoadMoreStatus } from 'sard-uniapp'
import { onLoad } from '@dcloudio/uni-app'
import { teachers } from '@/api'
import type { Teacher } from '@/api/interfaces'
import { listData } from '@/store'
import { makeLV } from '@/utls'
import DropdownSelect from '@/components/DropdownSelect.vue'

const dataList = listData()

const subjectsData = computed(() => {
  return dataList.value?.subjects.map((it) => {
    return {
      label: it.name,
      value: it.name,
      children: it.children.map((it1) => {
        return {
          label: it1.subject,
          value: it1.subject,
        }
      }),
    }
  })
})

// 线上/线下
const form = reactive({
  page: 1,
  per_page: 10,
  all: '',
  subjects: '',
  identity: '',
  teaching_type: '',
  teaching_position: uni.getStorageSync('location'),
})

onLoad((query) => {
  form.identity = query!.identity
  form.subjects = query!.subjects
})

const data = ref<Teacher[]>([])

const loadMoreStautus = ref<LoadMoreStatus>('incomplete')

function getList() {
  loadMoreStautus.value = 'loading'
  teachers(form).then((resp) => {
    const list = resp.data.teachers
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

watch(form, search)
</script>

<style lang="scss">
:deep(.sar-dropdown-item__value) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

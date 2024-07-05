<template>
  <navigator v-for="item in data" :key="item.title" :url="`/pages/article/detail?type=kopp&name=${item.title}`">
    <sar-card class="m-4">
      <view class="flex gap-2">
        <image class="size-20 shrink-0" :src="item.image" mode="aspectFill"/>
        <view class="overflow-hidden">
          <view class="my-3 truncate font-600">{{ item.article }}</view>
          <view class="mt-2">{{ item.title }}</view>
        </view>
      </view>
    </sar-card>
  </navigator>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import type { LoadMoreStatus } from 'sard-uniapp'
import { articleList } from '@/api'
import type { ArticleList } from '@/api/interfaces'

const form = reactive({
  page: 1,
  number: 20,
  per_page: 10,
  tag: '体育',
  phone: uni.getStorageSync('phone'),
})

onLoad((query) => {
  form.tag = query!.tag
  getList()
})

const data = ref<ArticleList[]>([])

const loadMoreStautus = ref<LoadMoreStatus>('incomplete')

function getList() {
  loadMoreStautus.value = 'loading'
  articleList(form).then((resp) => {
    const list = resp.data.articles
    data.value.push(...list)
    if (list.length == 0) {
      loadMoreStautus.value = 'complete'
    }
    else {
      loadMoreStautus.value = 'incomplete'
    }
  })
}

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

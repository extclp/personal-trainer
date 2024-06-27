<template>

</template>
<script setup lang="ts">
import { bigList } from '@/api';
import type { BigData, HomeData } from '@/api/interfaces';

const data = ref<BigData>()

const homeData = ref<HomeData>()

bigList({
    "name": "教员简介",
    "page": 1,
    "per_page": 10
}).then(resp => {
    data.value = resp.data;
})


</script>
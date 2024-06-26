<template>
    <sar-card title="朝天子·咏喇叭" extra="王磐〔明代〕">

    </sar-card>
</template>
<script setup lang="ts">
import { orderList } from '@/api/teacher';

const data = ref();

orderList({
    key: 0,
    page: 1,
    per_page: 10
}).then(resp => {
    data.value = resp.data;
})
</script>
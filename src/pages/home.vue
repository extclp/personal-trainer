<template>

</template>
<script setup lang="ts">
import { bigList } from '@/api';

bigList({
    "name": "教员简介",
    "page": 1,
    "per_page": 10
}).then(resp => {

})
</script>
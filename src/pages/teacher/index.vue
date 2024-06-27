<template>

</template>
<script setup lang="ts">
import { bigList, search } from '@/api';

search({
}).then(resp => {
    console.log(resp.data)
})
</script>
<style></style>
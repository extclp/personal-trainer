<template>
   
</template>
<script setup lang="ts">
import { search } from '@/api';

search({
}).then(resp => {
    console.log(resp.data)
})
</script>
<style>

</style>
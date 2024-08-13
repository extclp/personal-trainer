<template>
    <view class="flex justify-between" :class="{ 'place-holder': !model }" @click="show = true">
        <text v-if="model">{{ model }}</text>
        <text v-else class="place-holder">{{ placeholder }}</text>
        <sar-icon name="caret-right" />
    </view>
    <nut-popup v-model:visible="show" position="bottom" safe-area-inset-bottom>
        <nut-picker v-model="select" :columns="columns" :title="title" @cancel="show = false" @confirm="onConfirm" />
    </nut-popup>
</template>

<script setup lang="ts">

const select = ref<string[]>([]);

const model = defineModel<string>()

const props = defineProps({
    placeholder: String,
    title: String,
    columns: Array<String>,
})

const show = ref(false)

const columns = computed(() => {
    return props.columns?.map(it => ({ text: it, value: it }))
})

function onConfirm() {
    show.value = false
    model.value = select.value[0];
}
</script>
<style>
.place-holder {
    color: #b5b9bd;
}
</style>
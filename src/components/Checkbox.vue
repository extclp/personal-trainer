<template>
  <view class="custom-checkbox">
    <nut-icon v-if="isChecked" name="checked" custom-color="#3A94FE" @click="onClick(false)" />
    <nut-icon v-else name="check-normal" custom-color="#d6d6d6" @click="onClick(true)" />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  passive: {
    default: false,
  },
  value: {

  }
})

const value = defineModel()

const isChecked = computed(() => {
  if (props.value !== undefined)
    return props.value === value.value
  else
    return value.value
})

function onClick(to: boolean) {
  if (props.passive)
    return

  if (to) {
    if (props.value) {
      value.value = props.value
      return
    }
  }
  value.value = to
}
</script>

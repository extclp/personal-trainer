<template>
  <view>
    <nut-icon v-if="isChecked" name="checked" custom-color="#3A94FE" @click="onClick(false)" />
    <nut-icon v-else name="check-normal" custom-color="#d6d6d6" @click="onClick(true)" />
  </view>
</template>

<script setup lang="ts">
import { type Arrayable, isDef, remove } from '@antfu/utils'
import { computed } from 'vue'

const props = defineProps({
  passive: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [String, Number],
  },
})

const model = defineModel<Arrayable<string | number> | boolean>()

const isChecked = computed(() => {
  if (isDef(props.value)) {
    if (Array.isArray(model.value)) {
      return model.value.includes(props.value)
    }
    else {
      return model.value == model.value
    }
  }
  else {
    return model.value
  }
})

function onClick(to: boolean) {
  if (props.passive)
    return

  if (isDef(props.value)) {
    if (Array.isArray(model.value)) {
      if (to) {
        model.value.push(props.value)
      }
      else {
        remove(model.value, props.value)
      }
    }
    else {
      if (to) {
        model.value = props.value
      }
      else {
        model.value = undefined
      }
    }
  }
  else {
    model.value = to
  }
}
</script>

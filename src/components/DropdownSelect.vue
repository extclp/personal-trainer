<template>
  <sar-dropdown-item
    v-model:visible="visible" v-model="select" :placeholder="placeholder" :options="current"
    @update:model-value="onSelect"
  />
</template>

<script setup lang="ts">
import type { CascaderOption } from 'sard-uniapp'

const props = defineProps({
  placeholder: String,
  options: Array<CascaderOption>,
})

const model = defineModel<string>()

const visible = ref(false)

const data = ref<string[]>([])

const select = ref()
const current = ref<CascaderOption[]>(props.options ?? [])

function onSelect() {
  data.value.push(select.value)
  const entry = current.value.find(it => it.label == select.value)!
  if (entry.children && entry?.children.length) {
    select.value = undefined
    current.value = entry.children
    setTimeout(() => {
      visible.value = true
    }, 100)
  }
  else {
    model.value = data.value.join('  ')
    select.value = data.value.join('  ')

    // reset
    current.value = [
      ...props.options ?? [],
      {
        label: select.value,
        value: select.value,
        disabled: true,
      },
    ]
    data.value = []
  }
}

watch(() => props.options, () => {
  select.value = model.value

  const isRoot = props.options?.find(it => it.value == select.value)

  current.value = [...props.options ?? []]
  if (!isRoot) {
    current.value.push({
      label: select.value,
      value: select.value,
      disabled: true,
    })
  }
  data.value = []
})
</script>

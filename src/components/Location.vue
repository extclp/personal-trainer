<template>
  <view
    class="location ml-4 flex items-center"
    :style="{ marginTop: `${menuButton.top}px`, height: `${menuButton.height}px` }"
  >
    <image class="h-5 w-5" src="@/static/icons/location.svg" />
    <text class="ml-2">{{ location }}</text>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  locations: Array<string>,
})

const location = ref(localStorage.getItem('location'))

watch(() => props.locations, checkLocation)
function checkLocation() {
  if (props.locations && !location.value) {
    location.value = props.locations[0]
  }
}
checkLocation()

const locations = computed(() => {
  if (props.locations) {
    return props.locations
  }
  return JSON.parse(localStorage.getItem('locations')!) as string[]
})

let menuButton = {
  bottom: 83,
  height: 32,
  left: 296,
  right: 383,
  top: 51,
  width: 87,
}
// #ifdef MP-WEIXIN
menuButton = uni.getMenuButtonBoundingClientRect()
// #endif
</script>

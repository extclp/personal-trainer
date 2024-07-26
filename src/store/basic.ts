function createStore(name: string) {
  const data = ref(uni.getStorageSync(name))

  watch(data, () => {
    return uni.setStorageSync(name, data.value)
  })

  return data
}

export const nickName = createStore('nickName')

export const avatar = createStore('avatar')

export const qianming = createStore('qianming')

import { bigList, home, list, teacherDetail } from '@/api'
import type { BigData, DataList, HomeData, Teacher } from '@/api/interfaces'

const data = ref<BigData>()
export function bigData() {
  if (!data.value) {
    bigList({ page: 1, per_page: 10, name: '教员简介' }).then((resp) => {
      data.value = resp.data
    })
  }
  return data
}

const dataHome = ref<HomeData>()
export function homeData() {
  if (!dataHome.value) {
    home({
      page: 1,
      per_page: 10,
    }).then((resp) => {
      dataHome.value = resp.data
    })
  }
  return dataHome
}

const dataList = ref<DataList>()
export function listData() {
  if (!dataList.value) {
    list({}).then((resp) => {
      dataList.value = resp.data
    })
  }
  return dataList
}

export const isTeacher = ref(uni.getStorageSync('isTeacher') == '1')

export function setTeacher(type: string) {
  uni.setStorageSync('isTeacher', type)
  isTeacher.value = type == '1'
}

watch(isTeacher, update)

function update() {
  if (isTeacher.value) {
    uni.setTabBarItem({
      index: 2,
      text: '需求市场',
      pagePath: '/pages/order/public',
      iconPath: '/static/tabBar/public.png',
      selectedIconPath: '/static/tabBar/a_public.png',
    })
  }
  else {
    uni.setTabBarItem({
      index: 2,
      text: '需求发布',
      pagePath: 'pages/publish',
      iconPath: '/static/tabBar/publish.png',
      selectedIconPath: '/static/tabBar/a_publish.png',
    })
  }
}

export const dataTeacher = ref<Teacher>()

export function teacherData() {
  if (isTeacher.value) {
    teacherDetail({
      t_phone: uni.getStorageSync('phone'),
    }).then((resp) => {
      dataTeacher.value = resp.data.teacher
    })
    return dataTeacher
  }
  else {
    return {
      image: '',
      name: uni.getStorageSync('phone'),
    }
  }
}

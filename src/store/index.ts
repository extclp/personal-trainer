import { bigList, home, list } from '@/api'
import type { BigData, DataList, HomeData } from '@/api/interfaces'

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

export const teacher = ref(isTeacher())

export function setTechaer(type: number) {
  teacher.value == !!type;
  localStorage.setItem("isTeacher", String(type));
}

export function isTeacher() {
  return localStorage.getItem("isTeacher") == '1';
}
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn.js'
import relativeTime from 'dayjs/plugin/relativeTime'
import { isDef } from 'nutui-uniapp/components/_utils/is.js'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

export function ago(str: string) {
  return dayjs(str).fromNow()
}

export function makeLV(list?: string[]) {
  if (isDef(list))
    return list.map(it => ({ label: it, value: it }))
}

export function makeTV(list?: string[]) {
  if (isDef(list))
    return list.map(it => ({ text: it, value: it }))
}

export function format(date: Date) {
  return dayjs(date).format('YYYY-MM-DD')
}

export function formatM(date: Date) {
  return dayjs(date).format('YYYY-MM')
}

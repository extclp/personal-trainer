import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn.js'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

export function ago(str: string) {
  return dayjs(str).fromNow()
}

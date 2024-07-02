import { teacherDetail } from '@/api'

export const detail = ref()

export function initTeacher() {
  uni.setTabBarItem({
    index: 2,
    text: '需求市场',
    pagePath: '/pages/order/public',
    iconPath: 'static/taBar/public.png',
    selectedIconPath: 'static/taBar/a_public.png',
  })
  teacherDetail().then((resp) => {
    detail.value = resp.data.teacher
  })
}

import type { Commit, LoginReponse, sendCodeResp } from './interfaces'
import { type Data, request } from '@/api/common'

export function home(data: Data) {
  return request('/home', data)
}

export function bigList(data: Data) {
  return request('/big_list', data)
}

export function rolling(data: Data) {
  return request('/rolling', data)
}

export function search(data: Data) {
  return request('/search', data)
}

// 文章
export function articleCatlog() {
  return request('/academic/titles')
}

export function articleList(data: Data) {
  return request('/getone2all/kopp', data)
}

export function article(data: Data) {
  return request('/article/detail', data)
}

// ======= 登录 =======
export function login(data: Data) {
  return request<any, LoginReponse>('/quick_login', data)
}

export function sendCode(data: Data) {
  return request<any, sendCodeResp>('/mobile', data)
}

export function logout(data: Data) {
  return request('/logout', data)
}

// ======= 老师 =======
export function teachers(data: Data) {
  return request<{ teachers: [] }>('/select_block', data)
}

export function teacherEDetail(data: Data) {
  return request('/teacher/edit/detail', data)
}

export function teacherRegister(data: Data) {
  return request('/teacher', data)
}

export function teacherUpdate(data: Data) {
  return request('/edit/teacher', data)
}

export function teacherArticles(data: Data) {
  return request('/getone2all', data)
}

export function teacherDetail(data?: Data) {
  return request('/teacher/detail', data)
}

// 订单列表
export function finishedOrders(data: Data) {
  return request('/customer/finished_order', data)
}

export function orders(data: Data) {
  return request('/customer_teacher/order', data)
}

// ======= 留言 =======
export function commitList() {
  return request<Commit[]>('/mymessage')
}

export function messageSend(data: Data) {
  return request('/leavingmessage', data)
}

// ======= 我的 =======
export function detailManual(data: Data) {
  return request('/manual/detail', data)
}

export function detailFee(data: Data) {
  return request('/fee/detail', data)
}

export function collectArticle(data: Data) {
  return request('/academic/like', data)
}

export function list(data: Data) {
  return request('/teacher_order/list', data)
}

export function createOrder(data: Data) {
  return request('/customer/create_order', data)
}

// 收藏
export function articleLike(data: Data) {
  return request('/academic/like', data)
}

export function teacherLike(data: Data) {
  return request('/teacher/like', data)
}

export function collect(data: Data) {
  return request('/my/like', data)
}

// 订单

export function teahcerCommit(data: Data) {
  return request('/leavingmessage/teacher', data)
}
export function edit(data: Data) {
  return request('/customer/edit', data)
}

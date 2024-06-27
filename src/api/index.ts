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

export function news() {
  return request('/academic/titles')
}

export function search(data: Data) {
  return request('/search', data)
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
export function teacherRegister(data: Data) {
  return request('/teacher', data)
}

export function teacherUpdate(data: Data) {
  return request('/edit/teacher', data)
}

export function teacherArticles(data: Data) {
  return request('/getone2all', data)
}

export function teacherDetail(data: Data) {
return request('/teacher/detail', data)
}

export function finishedOrder(data: Data) {
  return request('/myfinishedorder', data)
}

export function orders(data: Data) {
  return request('/myorder', data)
}

// ======= 留言 =======
export function commitList(data: Data) {
  return request<Commit[]>('/mymessage', data)
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

// ======= 收藏 =======
export function collect(data: Data) {
  return request('/my/like', data)
}

export function collectArticle(data: Data) {
  return request('/academic/like', data)
}

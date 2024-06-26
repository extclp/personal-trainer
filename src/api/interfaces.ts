import type { Result } from './common'

export interface LoginReponse extends Result<any> {
  key: string
  vip: boolean
  token: string
}
export interface sendCodeResp extends Result<any> {
  account: string
  password: string
  mobile: string
  content: string
  format: string
  code: number
  message: string
}

export interface HomeData {
  address: string[]
  image: string[]
  announcement: string[]
  notice: {
    id: number
    name: string
    is_top: boolean
  }[]
  academic_news: New[]
  message: {
    username: string
    message: string
    time: string
    image: boolean
  }[]
}

export interface Commit {
  content: string
  time: string

  ago: string // custom
}

export interface New {
  id: number
  name: string
  title: string
  image: boolean
}

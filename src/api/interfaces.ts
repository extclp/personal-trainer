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
    image: string
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
  image: string
}

export interface BigData {
  search_list: {
    teachingCourse: string[]
    student: string[]
    teachingPosition: string[]
    teachingStyle: string[]
  }
  teachers: {
    name: string
    college: string
    phone: string
    sex: string
    image: boolean
    subject: string[]
    login_time: string
    major: string
    identity: string
    costRequest: string
    teachingPosition: string[]
  }[]
}

export interface ArticleCatlog {
  id: number
  image: string
  titles: string
}

export interface ArticleList {
  like: boolean
  title: string
  article: string
  image: string

}

export interface ArticleDetail {
  name: string
  writer: string
  time: string
  image: string
  content: string
}

export interface DataList {
  tutor_age: string[]
  cost: string[]
  teachingPosition: string[]
  subjects: {
    id: number
    name: string
    children: {
      id: number
      subject: string
    }[]
  }[]
  student_grade: string[]
  students: {
    name: string
    sex: string
    grade: string
  }[]
}

export interface TeacherForm {
  phone: string
  birthday: string
  // school: string;
  college: string
  personalExperience: string[]
  // personal_experience: string[];

  name: string
  sex: string
  tutorAge: string
  costRequest: string
  image: string
  major: string
  student: string
  identity: string
  teachingStyle: string[]
  teachingTime: number[][]
  teachingPosition: string[]
  teachingCourse: string[]
  achievement: string[]
  introduction: string
  address: string
  cost: string
}

export interface Teacher extends TeacherForm {
  age: string
  login_time: string
}

export interface Collect {
  trechers: Teacher[]
  articles: {
    title: string
    article: string
    image: string
  }[]
}
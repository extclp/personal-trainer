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

export interface RegisterForm {
  phone: string;
  name: string;
  sex: string;
  school: string;
  major: string;
  birthday: string;
  tutorAge: string;
  image: string;
  identity: string;
  teachingCourse: string[];
  teachingPosition: string[];
  student: string;
  teachingStyle: string[];
  teachingTime: number[][];
  address: string;
  cost: string;
  introduction: string;
  personalExperience: string[];
  achievement: string[];
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
  image: boolean
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

export interface Article {
  name: string
  writer: string
  time: string
  image: boolean
  content: string
}


export interface DataList {
  tutor_age: string[];
  cost: string[];
  teachingPosition: string[];
  subjects: {
    id: number;
    name: string;
    children: {
      id: number;
      subject: string;
    }[];
  }[];
  student_grade: string[];
  students: {
    name: string;
    sex: string;
    grade: string;
  }[];
}

export interface Teacher {
  name: string;
  sex: string;
  tutorAge: string;
  costRequest: string;
  image: string;
  school: string;
  major: string;
  age: string;
  student: string;
  identity: string;
  teachingStyle: string[];
  teachingTime: number[][];
  teachingPosition: string[];
  teachingCourse: string[];
  personal_experience: string[];
  achievement: string[];
  introduction: string;
  login_time: string;
  address: string;
  cost: string;
}
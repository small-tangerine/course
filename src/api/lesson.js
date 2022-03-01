import axios from 'utils/axios.js'

// 课程导航
export function getLessonNav () {
  return axios.get('/api/v1/label')
}

// 课程列表
export function getLessonList (params) {
  return axios.get('/api/v1/lesson', {
    params
  })
}

// 课程详情
export function getLessonDetail (params) {
  return axios.get('/api/v1/lesson/info', {
    params
  })
}

// 课程目录
export function getLessonComment (params) {
  return axios.get('/api/v1/lesson/comment', {
    params
  })
}

// 课程问答
export function getLessonQa (params) {
  return axios.get('/api/v1/lesson/qa', {
    params
  })
}

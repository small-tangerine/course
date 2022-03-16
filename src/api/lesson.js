import axios from '../utils/axios.js'

// 课程导航
export function getLessonNav () {
  return axios.get('/api/v2/category/list')
}

// 课程列表
export function getLessonList (params) {
  return axios.get('/api/v2/course/list', {
    params
  })
}

// 课程详情
export function getLessonDetail (params) {
  return axios.get('/api/v2/course/detail', {
    params
  })
}

// 课程目录
export function getLessonVideo (params) {
  return axios.get('/api/v2/course/video',{
    params}
  )
}

export function getLessonSetVideo (params) {
  return axios.post('/api/v2/course/video-set-current',
      params
  )
}

// 课程问答
export function getLessonQa (params) {
  return axios.get('/api/v1/lesson/qa', {
    params
  })
}

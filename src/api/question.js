import axios from 'utils/axios.js'

// 获取猿问列表数据
export function getQuestionList (params) {
  return axios.get('/api/v1/question/', {
    params
  })
}

// 获取关注标签列表
export function getFollowList () {
  return axios.get('/api/v1/label/follow/list')
}

// 关注标签
export function followLabels (data) {
  return axios.post('/api/v1/label/follow', data)
}

// 获取标签列表数据
export function getLabelList () {
  return axios.get('/api/v1/label')
}

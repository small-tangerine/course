import axios from 'utils/axios.js'

// 获取专栏类型数据
export function getReadTypes () {
  return axios.get('/api/v1/read/types')
}

// 获取专栏列表数据
export function getReadList (params) {
  return axios.get(`/api/v1/read`, {
    params
  })
}

// 获取专栏详情数据
export function getReadDetail (id) {
  return axios.get(`/api/v1/read/${id}`)
}

// 获取推荐专栏数据
export function getRecommendRead () {
  return axios.get('/api/v1/read/recommend')
}

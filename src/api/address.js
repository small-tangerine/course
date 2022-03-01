import axios from 'utils/axios.js'

// 获取用户收货地址接口
export function getUserAddresss () {
  return axios.get('/api/v1/address')
}

// 新建用户收货地址接口
export function createUserAddress (data) {
  return axios.post('/api/v1/address/', data)
}

// 编辑用户收货地址接口
export function updateUserAddress (data) {
  return axios.put(`/api/v1/address/${data.id}`, data)
}

// 删除用户收货地址接口
export function deleteUserAddress (params) {
  return axios.delete(`/api/v1/address/${params.id}`)
}

// 设为默认收货地址接口
export function defaultUserAddress (params) {
  return axios.get('/api/v1/address/default', {
    params
  })
}

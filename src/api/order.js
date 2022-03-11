import axios from 'utils/axios.js'

// 分页获取用户充值记录接口
export function getUserRecharges (params) {
  return axios.get('/api/v2/recharge/list', {
    params
  })
}

// 新增用户充值记录接口
export function createUserRecharges (data) {
  return axios.post('/api/v2/recharge/create', data)
}

// 查询用户余额接口
export function getUserCharge () {
  return axios.get('/api/v2/recharge/info')
}

// 用户消费记录接口
export function getUserBillList (params) {
  return axios.get('/api/v2/bills/list', {
    params
  })
}

// 生成订单
export function createOrder (data) {
  return axios.post('/api/v2/order/create', data)
}

// 订单详情
export function getOrderInfo (params) {
  return axios.get('/api/v2/order/detail', {
    params
  })
}

// 订单支付
export function orderPay (data) {
  return axios.post('/api/v2/order/pay', data)
}

// 订单列表
export function getOrderList (params) {
  return axios.get('/api/v2/order/list', {
    params
  })
}

// 取消订单
export function cancelOrder (params) {
  return axios.post('/api/v2/order/cancel', params)
}

// 删除订单
export function deleteOrder (params) {
  return axios.post(`/api/v2/order/delete`, params)
}

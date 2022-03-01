import axios from 'utils/axios.js'

// 分页获取用户充值记录接口
export function getUserRecharges (params) {
  return axios.get('/api/v1/recharge/', {
    params
  })
}

// 新增用户充值记录接口
export function createUserRecharges (data) {
  return axios.post('/api/v1/recharge/', data)
}

// 查询用户余额接口
export function getUserCharge () {
  return axios.get('/api/v1/recharge/charge')
}

// 用户优惠券接口
export function getCouponList (params) {
  return axios.get('/api/v1/coupon/', {
    params
  })
}

// 用户消费记录接口
export function getUserBillList (params) {
  return axios.get('/api/v1/bill/', {
    params
  })
}

// 生成订单
export function createOrder (data) {
  return axios.post('/api/v1/order/', data)
}

// 订单详情
export function getOrderInfo (params) {
  return axios.get('/api/v1/order/info', {
    params
  })
}

// 订单支付
export function orderPay (data) {
  return axios.post('/api/v1/order/pay', data)
}

// 订单列表
export function getOrderList (params) {
  return axios.get('/api/v1/order/', {
    params
  })
}

// 取消订单
export function cancelOrder (params) {
  return axios.get('/api/v1/order/cancel', {
    params
  })
}

// 删除订单
export function deleteOrder (params) {
  return axios.delete(`/api/v1/order/${params.id}`)
}

// 用户咨询接口
export function consultList () {
  return axios.get('/api/v1/consult/')
}

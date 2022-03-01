import axios from 'utils/axios.js';

// 获取购物车列表接口
export function getCartList () {
  return axios.get('/api/v1/cart/');
}

// 单个添加购物车接口
export function addCart (data) {
  return axios.post('/api/v1/cart/', data);
}

// 单个删除购物车接口
export function deleteCart (data) {
  console.log(data);
  return axios.delete(`/api/v1/cart/${data.id}`);
}

// 多个删除购物车接口
export function multipleDeleteCart (data) {
  return axios.delete(`/api/cart/${data.ids}`, data);
}

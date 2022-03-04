import axios from 'utils/axios.js';

// 获取购物车列表接口
export function getCartList () {
  return axios.get('/api/v2/carts/list');
}

// 单个添加购物车接口
export function addCart (data) {
  return axios.post('/api/v2/carts/create', data);
}

// 单个删除购物车接口
export function deleteCart (data) {
  return axios.post(`/api/v2/carts/delete/${data.id}`);
}

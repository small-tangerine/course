import axios from 'utils/axios.js'

// 分页获取中心列表
export function getNoticeList (params) {
  return axios.get(`/api/v1/notice/`, {
    params: params
  })
}

// 单个消息已读
export function noticeReadOne (data) {
  return axios.post('/api/v1/notice/read', data)
}

// 单个消息删除
export function noticeNoticeDelete (data) {
  return axios.delete(`/api/v1/notice/${data.id}`)
}

// 全部消息已读
export function noticeReadAll (data) {
  return axios.post('/api/v1/notice/read/all', data)
}

// 获取消息中心设置
export function getNoticeSetting () {
  return axios.get('/api/v1/notice/setting')
}

// 是否存在未读消息
export function getNotReadNotice () {
  return axios.get('/api/v1/notice/read/not')
}

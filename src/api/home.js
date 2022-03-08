import axios from 'utils/axios.js'

// 获取主页课程信息
export function getHomeCourse () {
  return axios.get('/api/v1/home/lesson')
}

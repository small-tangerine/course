import axios from '../utils/axios'

// 用户登录
export function userLogin (data) {
  return axios.post('/api/v2/account/login', data)
}

// 用户注册接口
export function userRegister (data) {
  return axios.post('/api/v2/account/register', data)
}

//用户重置密码
export function userForget (data) {
  return axios.post('/api/v2/account/reset-password', data)
}


// 编辑账号绑定信息
export function updateUserBinds (data) {
  return axios.post('/api/v2/user/update-account-info', data)
}

// 编辑用户个人信息
export function updateUserInfo (data) {
  return axios.post('/api/v2/user/update-base-info', data)
}

// 编辑用户个人信息
export function updateUserAvatar (data) {
  const d=document.getElementsByClassName("dd")
  d.item(0).innerHTML
  return axios.post('/api/v2/avatar/upload', data)
}

// 获取用户课程信息接口
export function getUserCourse (params) {
  return axios.get('/api/v2/course/user-course', {
    params
  })
}

// 获取用户课程信息接口
export function getUserLearn () {
  return axios.get('/api/v2/user/learn')
}

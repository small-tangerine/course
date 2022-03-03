import axios from 'axios'
import store from '../store/index.js'
import components from '../register.js'
const Message = components.Message
const service = axios.create({
  timeout: 10000,
  withCredentials: true
})

// 请求拦截
service.interceptors.request.use(
  config => {
      config.headers['Authorization'] = 'eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoi55So5oi3MTY0NjI5Njk0ODEyMCIsInN1YiI6IjEzNjMwNDk3OTE2IiwiaWF0IjoxNjQ2Mjk2OTQ4MTIwLCJ1dWlkIjpudWxsLCJqdGkiOiJjMzY5M2U2My1hNDI5LTRhMGMtOTM5MS00NzBkNDNlMmFlNjcifQ.6327p4L87ZRpQOxTItCyM22bSy_YjPzgvcc7HzlULiE'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//响应拦截
service.interceptors.response.use(
  response => {
    let {status, data} = response
    if (status !== 200 && status !== 201 && status !== 204) {
      Message.error('网络异常，请刷新或者重试!')
      return Promise.reject('网络异常!')
    }
    if (data.code === 401) {
        store.commit('login/SET_LOGIN_ACTION', 'login')
      store.commit('login/SET_SHOW_LOGIN', true)
      store.dispatch('login/logout')
      return Promise.resolve({
        code: -1,
        msg: data.msg
      })
    } else {
      return Promise.resolve(data)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service

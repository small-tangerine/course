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
        config.headers['Authorization'] = 'eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoi55So5oi3MTY0NjMyMDMwMzkxNCIsInN1YiI6IjEzNjMwNDk3OTE2IiwiaWF0IjoxNjQ2MzIwMzA0MDAwLCJ1dWlkIjo2LCJqdGkiOiJkYzRlODljNi1iYzczLTRkYmEtYTU0NS01Y2E5NDE3NThiODMifQ.i8lEv1E8775hTjgwuJ2o0Ok0TKtRIftr8D25MbUOoEg'
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
        if (data.code !== 401){
            return Promise.resolve(data)
        }
        if (response.status === 200 && !data.error && data.error !== 0) {
            return response
        }
        if (data.error !== 0) {
            if (data.error === 4001) {
                store.commit('login/SET_LOGIN_ACTION', 'login')
                store.commit('login/SET_SHOW_LOGIN', true)
                store.dispatch('login/logout')
                return Promise.resolve({
                    error: -1,
                    msg: data.msg
                })
            } else {
                Message.error(data.msg)
                return Promise.reject(new Error(data.msg || 'Error'))
            }
        } else {
            return Promise.resolve(data)
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default service

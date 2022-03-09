import axios from 'axios'
import store from '../store/index.js'
import components from '../register.js'
import {getToken, setToken, setSeconds, removeToken} from "./auth";
import {removeUserInfo} from "utils/cache";
const Message = components.Message
const service = axios.create({
    timeout: 10000,
    withCredentials: true
})

// 请求拦截
service.interceptors.request.use(
    config => {
        const token = getToken()
        if (token) {
            config.headers['Authorization'] = token
        }
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
        const token = response.headers.authorization
        if (token) {
            // 判断与原有token是否相等
            // 不等就换成返回来的token
            setToken(token, 1800)
            setSeconds(1800)
        }
        if (status !== 200 && status !== 201 && status !== 204) {
            Message.error('网络异常，请刷新或者重试!')
            return Promise.reject('网络异常!')
        }
        if (data.code !== 401 && !data.error){
            return Promise.resolve(data)
        }
        if (response.status === 200 && !data.error && data.error !== 0) {
            return response
        }
        if (data.error !== 0) {
            if (data.error === 4001) {
                store.commit('login/SET_LOGIN_ACTION', 'login')
                store.commit('login/SET_SHOW_LOGIN', true)
                removeToken()
                store.commit('login/SET_USER_INFO', undefined)
                removeUserInfo()
                return Promise.resolve({
                    error: -1,
                    msg: data.msg
                })
            } else {
                Message.error(data.msg)
                return Promise.resolve({
                    error: -1,
                    msg: data.msg
                })
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

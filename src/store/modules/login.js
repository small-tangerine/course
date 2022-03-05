import axios from '../../utils/axios'
import { ERR_OK } from '../../api/config'
import * as types from '../mutation-types.js'
import { getUserInfo, setUserInfo, removeUserInfo } from '../../utils/cache'
import {removeToken} from "../../utils/auth";
const state = {
  showLogin: false,
  action: '',
  userinfo: getUserInfo()
}
const mutations = {
  [types.SET_SHOW_LOGIN] (state, showLogin) {
    state.showLogin = showLogin
  },
  [types.SET_LOGIN_ACTION] (state, action) {
    state.action = action
  },
  [types.SET_USER_INFO] (state, userinfo) {
    state.userinfo = userinfo
    if (userinfo) {
      setUserInfo(userinfo)
    } else {
      removeUserInfo(userinfo)
    }
  }
}

const actions = {
  logout ({commit }) {
    return new Promise((resolve, reject) => {
      axios.post('/api/v2/account/logout').then(res => {
        const { error } = res
        if (error === ERR_OK) {
          commit(types.SET_USER_INFO, '')
          removeToken()
          resolve()
        } else {
          reject()
        }
      }).catch(() => {
        reject()
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

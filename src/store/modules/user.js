import { getToken, setToken, removeToken } from "@/utils/auth"
import { login, getUserInfo, } from '@/api/user'
import { resetRouter } from "@/router"

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: {},
  }
}

const state = getDefaultState()

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, user) {
    state.userInfo = user
  },
}

const actions = {
  // user login
  async login({ commit }, data) {
    // console.log(data);
    let res = await login(data)
    // console.log(res);
    commit('setToken', res.data)
  },
  async getUserInfo({ commit }) {
    let res = await getUserInfo()
    // console.log(res);
    commit('setUserInfo', res.data)
    return res.data
  },
  logout({ commit }) {
    commit('removeToken')
    commit('setUserInfo', {})
    resetRouter()
  },
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}


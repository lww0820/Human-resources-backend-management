import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import zzh from './modules/zzh'
import user from './modules/user'
import app from './modules/app'
import settings from './modules/settings'
import routerMol from './modules/myRouters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    zzh,
    user,
    app,
    settings,
    routerMol
  },
  getters
})

export default store

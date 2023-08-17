import {constantRoutes} from '@/router/index'

export default {
    namespaced: true,
    state: {
        routes:constantRoutes
    },
    mutations: {
        setRouter(state, routerArr) {
           state.routes=[...constantRoutes,...routerArr]
        },
    },
}
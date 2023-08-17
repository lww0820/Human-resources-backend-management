import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { myRouter } from '@/router'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/404'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // 开启进度条
  NProgress.start()
  // 路由守卫
  if (store.getters.token) {
    // console.log(store.getters.token);
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断有没有用户资料 没有就获取用户资料
      let path = to.path
      if (!store.getters.userId) {
        let res = await store.dispatch('user/getUserInfo')
        // console.log(res); 
        // console.log(myRouter);
        let fileRouter = myRouter.filter(item => {
          return res.roles.menus.includes(item.name)
        })
        console.log(fileRouter);
        store.commit('routerMol/setRouter', fileRouter)
        router.addRoutes([...fileRouter, { path: '*', redirect: '/404', hidden: true }])
        next(path)
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }

})

router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})

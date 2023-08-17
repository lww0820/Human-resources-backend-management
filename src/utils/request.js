// import axios from 'axios'



// const service = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url

//   timeout: 5000 // request timeout
// })

// // request interceptor
// service.interceptors.request.use(
//   config => {

//     return config
//   },
//   error => {
//     // do something with request error
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )

// // response interceptor
// service.interceptors.response.use(

//   response => {
//      return response.data

//   },
//   error => {

//     return Promise.reject(error)
//   }
// )

// export default service




import Axios from "axios";
import store from "@/store";
import { Message } from "element-ui";
import router from "@/router";

const serve = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // timeout: 5000
})

serve.interceptors.request.use(
  config => {
    // console.log(process.env);
    if (store.getters.token) {
      config.headers.Authorization = 'Bearer ' + store.getters.token
    }
    return config
  },
  error => {

    return Promise.reject(error)
  }

)

serve.interceptors.response.use(response => {
  if(response.data instanceof Blob) return response.data
  return response.data
},
  error => {
    // console.dir(error); //以对象的形式输出错误
    if (error.response.status === 401) {
      store.dispatch('user/logout')
      Message({ type: 'warning', message: 'token过期了' })
      router.push('/login')
      return Promise.reject(error)

    }
    return Promise.reject(error)
  }
)

export default serve
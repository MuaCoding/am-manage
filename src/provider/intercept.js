import axios from 'axios'

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'

export default {
  fetchGet(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}



// import axios from 'axios'
// import qs from 'qs'

// var cancel, promiseArr = {}
// var CancelToken = axios.CancelToken

// const Axios = axios.create({
//   // 正式上线的时候使用这个，跨域问题有后台解决
//   baseURL: process.env.API_HOST,
//   //baseURL: '/api',
//   timeout: 10000,
//   responseType: 'json',
//   // withCredentials: true,
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
//   }
// })

// // 请求拦截
// Axios.interceptors.request.use(config => {
//   // post传参序列化
//   if (config.method === "post") {
//     config.data = qs.stringify(config.data);
//   }

//   if (promiseArr[config.url]) {
//     promiseArr[config.url]('操作取消')
//     promiseArr[config.url] = cancel
//   } else {
//     promiseArr[config.url] = cancel
//   }
//   return config
// }, error => {
//   return Promise.reject(error)
// })

// // 响应拦截
// Axios.interceptors.response.use(response => {
//   return response
// }, error => {
//   if (error && error.response) {
//     switch (error.response.status) {
//       case 400:
//         error.message = '错误请求'
//         break;
//       case 401:
//         error.message = '未授权，请重新登录'
//         break;
//       case 403:
//         error.message = '拒绝访问'
//         break;
//       case 404:
//         error.message = '请求错误,未找到该资源'
//         break;
//       case 405:
//         error.message = '请求方法未允许'
//         break;
//       case 408:
//         error.message = '请求超时'
//         break;
//       case 500:
//         error.message = '服务器端出错'
//         break;
//       case 501:
//         error.message = '网络未实现'
//         break;
//       case 502:
//         error.message = '网络错误'
//         break;
//       case 503:
//         error.message = '服务不可用'
//         break;
//       case 504:
//         error.message = '网络超时'
//         break;
//       case 505:
//         error.message = 'http版本不支持该请求'
//         break;
//       default:
//         error.message = `连接错误${error.response.status}`
//     }
//   } else {
//     error.message = "连接到服务器失败"
//   }
//   message.error(error)
//   return Promise.resolve(error.response)
// })

// // get/post方法暴露
// export default {
//   get(url, param = {}) {
//     return new Promise((resolve, reject) => {
//       Axios({
//         method: 'get',
//         url,
//         params: param,
//         cancelToken: new CancelToken(c => {
//           cancel = c
//         })
//       }).then(res => {
//         resolve(res)
//       })
//     })
//   },
//   post(url, param = {}) {
//     return new Promise((resolve, reject) => {
//       Axios({
//         method: 'post',
//         url,
//         data: param,
//         cancelToken: new CancelToken(c => {
//           cancel = c
//         })
//       }).then(res => {
//         resolve(res)
//       })
//     })
//   }
// }
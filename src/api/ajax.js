// 对axios请求进行二次封装
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

// 配置不显示右上角的旋转进度条, 只显示水平进度条
NProgress.configure({ showSpinner: false }) 

const service = axios.create({
    baseURL: "/api", // 基础路径
    timeout: 15000   // 连接请求超时时间
})

// 添加请求拦截器 
service.interceptors.request.use((config) => {
    // 显示请求中的水平进度条
    NProgress.start()
    /* 每次请求总是携带用户临时ID(不管是否登陆) */
    config.headers['userTempId'] = store.state.user.userTempId
    // 有token的话 请求头要加上token
    if(store.state.user.userInfo.token){
        config.headers['token'] = store.state.user.userInfo.token
    } 
    // 必须返回配置对象
    return config
})
// 添加响应拦截器 
service.interceptors.response.use((response) => {
    // 隐藏进度条
    NProgress.done()
    // 返回响应体数据
    return response.data
}, (error) => {
    // 隐藏进度条
    NProgress.done()
    // 统一处理一下错误
    alert( `请求出错: ${error.message||'未知错误'}`)
    // 后面可以选择不处理或处理
    return Promise.reject(error)
})

export default service
  
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as api from '@/api'
// 引入全局组件
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'
// 图片懒加载
import VueLazyload from 'vue-lazyload'

// 引入模拟接口文件
import './mock/mockserver'
// 按需引入elementui组件
import './plugins/element.js'

Vue.config.productionTip = false
// 将TypeNav注册为全局组件方便使用
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = api
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')
// 图片懒加载
const loading = require('@/assets/images/loading.gif')
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading,
  attempt: 1
})

// 要进行守卫的路由
const checkPaths =  ['/trade', '/pay', '/center']
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 在上述路由中进行守卫
    if(checkPaths.indexOf(to.path) != -1){
      // 未登录跳转到登录页
        if(!store.state.user.userInfo.token){
          next('/login')
        }
    }
    else next()
})
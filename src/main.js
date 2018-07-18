import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Router from 'vue-router'
import routes from './routes'
//require('es6-promise').polyfill();

Vue.use(Router)

Vue.prototype.$EventBus = new Vue()

Vue.prototype.$http = axios

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes,
  linkActiveClass: "",
})

router.beforeEach((to, from, next) => {
  // ...
  //console.log(to.path)
  if(to.path === '/'){
    next({ path: '/m/' })
    console.log('리다이렉트')
    //next('/m/')
  }else {
    next()
  }
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})

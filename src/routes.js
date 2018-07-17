//const Main = () => import('./Main.vue')
import Main from './Main.vue'
import Store from './Store.vue'
export default [
    {
      path: '/',
      name: 'home-page',
      component: Main
    },
    {
      path: '/store',
      name: 'store-page',
      component: Store
    },
]
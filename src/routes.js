//const Main = () => import('./Main.vue')
import Main from './Main.vue'
import Store from './Store.vue'
export default [
    {
      path: '/m/',
      name: 'home-page',
      component: Main
    },
    {
      path: '/m/store',
      name: 'store-page',
      component: Store
    },
]
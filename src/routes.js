//const Main = () => import('./Main.vue')
import Main from './Main.vue'
import Store from './Store.vue'
import StoreView from './StoreView.vue'
import Sales from './Sales.vue'
import SalesView from './SalesView.vue'
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
    {
      path: '/m/storeView/:categoryCode/:storeName/:id',
      name: 'store-view',
      component: StoreView
    },
    {
      path: '/m/sales',
      name: 'sales-page',
      component: Sales
    },
    {
      path: '/m/salesView/:id',
      name: 'sales-view',
      component: SalesView
    },
    {
      path: '*',
      redirect: '/m/'
    }
]

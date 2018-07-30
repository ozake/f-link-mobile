//const Main = () => import('./Main.vue')
import Main from './Main.vue'
import Store from './Store.vue'
import StoreView from './StoreView.vue'
import Sales from './Sales.vue'
import SalesView from './SalesView.vue'
import Brands from './Brands.vue'
import FranchiseView from './FranchiseView.vue'
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
      path: '/m/brands',
      name: 'brands-page',
      component: Brands
    },
    {
      path: '/m/franchiseView/:id',
      name: 'franchise-view',
      component: FranchiseView
    },
    {
      path: '*',
      redirect: '/m/'
    }
]

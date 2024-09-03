import { createRouter, createWebHistory } from 'vue-router'
import MarketOverview from '../views/MarketOverview.vue'
import Coins from '../views/Coins.vue'
import CoinDetail from '../views/CoinDetail.vue'
// ... 其他頁面

const routes = [
  {
    path: '/market-overview',
    name: 'MarketOverview',
    component: MarketOverview
  },
  {
    path: '/coins',
    name: 'Coins',
    component: Coins
  },
  {
    path: '/coins/:id',
    name: 'CoinDetail',
    component: CoinDetail
  }
  // ... 其他路由
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

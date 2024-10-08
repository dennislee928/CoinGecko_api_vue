import { createRouter, createWebHistory } from 'vue-router'
import CoinDetail from '../views/CoinDetail.vue'
import Coins from '../views/Coins.vue'
import MarketOverview from '../views/MarketOverview.vue'

const routes = [
  {
    path: '/',
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
    component: CoinDetail,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
})

export default router

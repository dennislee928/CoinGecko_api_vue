<template>
  <div>
    <ul>
      <li v-for="coin in coins" :key="coin.id">
        <router-link :to="{ name: 'CoinDetail', params: { id: coin.id } }">
          {{ coin.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import coinData from './coin_id.json' // 使用相對路徑引入 JSON 文件

export default {
  name: 'CoinList', // 修改組件名稱以符合多字規則
  data() {
    return {
      coins: coinData // 直接使用引入的 JSON 資料
    }
  },
  async mounted() {
    try {
      const response = await fetch('./front-page/views/coin_id.json') // 替換為實際的 JSON 文件路徑
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      this.coins = await response.json()
    } catch (error) {
      console.error('Error fetching coins:', error)
    }
  },
  methods: {
    async fetchCoinDetails(coinId) {
      try {
        const response = await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const coinDetails = await response.json()
        console.log(coinDetails)
      } catch (error) {
        console.error('Error fetching coin details:', error)
      }
    }
  }
}
</script>

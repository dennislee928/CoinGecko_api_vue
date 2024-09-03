<template>
  <div>
    <h1>CoinList</h1>
    <ul>
      <li v-for="coin in coins" :key="coin.id">
        <router-link :to="`/coins/${coin.id}`">{{ coin.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CoinList',
  data() {
    return {
      coins: []
    }
  },
  async created() {
    try {
      const response = await fetch('https://api.coinpaprika.com/v1/coins')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      this.coins = data
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }
}
</script>

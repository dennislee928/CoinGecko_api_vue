<template>
  <Navbar />
  <div class="container">
    <h1>CoinList</h1>
    <div v-if="loading" class="loading-spinner">
      <div class="spinner"></div>
    </div>
    <ul v-else class="coin-list">
      <li v-for="coin in coins" :key="coin.id">
        <router-link :to="`/coins/${coin.id}`">{{ coin.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Coin {
  id: string
  name: string
}

export default defineComponent({
  name: 'CoinList',
  data() {
    return {
      coins: [] as Coin[],
      loading: true
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
    } finally {
      this.loading = false
    }
  }
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.spinner {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.coin-list {
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
}

.coin-list li {
  margin: 10px 0;
  text-align: center;
}

router-link {
  text-decoration: none;
  color: #3498db;
}

router-link:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .container {
    padding: 10px;
  }

  .coin-list {
    font-size: 14px;
  }

  .coin-list li {
    margin: 5px 0;
  }
}
</style>

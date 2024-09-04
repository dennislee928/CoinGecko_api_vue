<template>
  <div class="coins-container">
    <div v-if="loading" class="loading-spinner">
      <div class="spinner"></div>
    </div>
    <div v-else class="coin" v-for="coin in coins" :key="coin.id">
      {{ coin.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useCoinStore } from '../stores/coinStore'

export default defineComponent({
  name: 'CoinList',
  setup() {
    const coinStore = useCoinStore()
    const coins = computed(() => coinStore.coins)
    const loading = computed(() => coinStore.loading)

    onMounted(() => {
      coinStore.fetchCoins()
    })

    return {
      coins,
      loading
    }
  }
})
</script>

<style scoped>
.coins-container {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

.coin {
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  /* 其他樣式 */
}
</style>

import { defineStore } from 'pinia'

interface Coin {
  id: string
  name: string
}

export const useCoinStore = defineStore('coinStore', {
  state: () => ({
    coins: [] as Coin[],
    loading: true
  }),
  actions: {
    async fetchCoins() {
      this.loading = true
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
  }
})

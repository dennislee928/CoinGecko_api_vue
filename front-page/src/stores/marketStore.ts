import { defineStore } from 'pinia'

interface Market {
  id: string
  name: string
}

export const useMarketStore = defineStore('marketStore', {
  state: () => ({
    markets: [] as Market[],
    loading: true
  }),
  actions: {
    async fetchMarkets() {
      this.loading = true
      try {
        const response = await fetch('https://api.coinpaprika.com/v1/global')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        this.markets = data.map((market: any) => ({
          id: market.id,
          name: market.name
        }))
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
      } finally {
        this.loading = false
      }
    }
  }
})

export default useMarketStore

import { defineStore } from 'pinia'

interface Coin {
  id: string
  name: string
  symbol: string
  rank?: number
  price?: number
  change_24h?: number
  market_cap?: number
  volume_24h?: number
}

interface CoinState {
  coins: Coin[]
  loading: boolean
  error: string | null
  page: number
  pageSize: number
  hasMore: boolean
  searchQuery: string
  filter: string
  lastFetched: number | null
  cache: Map<string, Coin[]>
}

export const useCoinStore = defineStore('coinStore', {
  state: (): CoinState => ({
    coins: [],
    loading: false,
    error: null,
    page: 1,
    pageSize: 20,
    hasMore: true,
    searchQuery: '',
    filter: 'all',
    lastFetched: null,
    cache: new Map()
  }),

  getters: {
    // 取得顯示的幣種（考慮搜尋和篩選）
    displayedCoins: (state) => {
      let filtered = state.coins

      // 搜尋篩選
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        filtered = filtered.filter(coin => 
          coin.name.toLowerCase().includes(query) ||
          coin.symbol.toLowerCase().includes(query)
        )
      }

      // 排名篩選
      if (state.filter !== 'all') {
        const limit = parseInt(state.filter.replace('top', ''))
        filtered = filtered.filter(coin => coin.rank && coin.rank <= limit)
      }

      return filtered.slice(0, state.page * state.pageSize)
    },

    // 檢查是否需要重新載入（快取過期）
    shouldRefetch: (state) => {
      if (!state.lastFetched) return true
      const now = Date.now()
      const cacheAge = now - state.lastFetched
      return cacheAge > 5 * 60 * 1000 // 5分鐘快取
    }
  },

  actions: {
    // 設定搜尋查詢
    setSearchQuery(query: string) {
      this.searchQuery = query
      this.page = 1
    },

    // 設定篩選
    setFilter(filter: string) {
      this.filter = filter
      this.page = 1
    },

    // 載入更多幣種
    async loadMore() {
      if (this.loading || !this.hasMore) return
      
      this.page++
      await this.fetchCoins()
    },

    // 重置分頁
    resetPagination() {
      this.page = 1
      this.hasMore = true
    },

    // 主要載入幣種資料
    async fetchCoins() {
      // 檢查快取
      const cacheKey = `${this.searchQuery}-${this.filter}`
      if (this.cache.has(cacheKey) && !this.shouldRefetch) {
        this.coins = this.cache.get(cacheKey) || []
        return
      }

      try {
        this.loading = true
        this.error = null

        const response = await fetch('https://api.coinpaprika.com/v1/coins')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        // 限制載入前100個幣種以提升效能
        this.coins = data.slice(0, 100)
        
        // 更新快取
        this.cache.set(cacheKey, this.coins)
        this.lastFetched = Date.now()

        // 載入價格資料（分批載入以提升效能）
        await this.loadPrices()

      } catch (error) {
        console.error('Error fetching coins:', error)
        this.error = error instanceof Error ? error.message : '載入失敗'
      } finally {
        this.loading = false
      }
    },

    // 分批載入價格資料
    async loadPrices() {
      const coinsToLoad = this.coins.slice(0, 20) // 只載入前20個幣種的價格
      
      const pricePromises = coinsToLoad.map(async (coin) => {
        try {
          const response = await fetch(`https://api.coinpaprika.com/v1/tickers/${coin.id}`)
          if (response.ok) {
            const ticker = await response.json()
            coin.price = ticker.quotes.USD.price
            coin.change_24h = ticker.quotes.USD.percent_change_24h
            coin.market_cap = ticker.quotes.USD.market_cap
            coin.volume_24h = ticker.quotes.USD.volume_24h
          }
        } catch (error) {
          console.error(`Error fetching price for ${coin.id}:`, error)
        }
      })

      await Promise.all(pricePromises)
    },

    // 載入單一幣種詳情
    async fetchCoinDetail(coinId: string) {
      try {
        const response = await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error('Error fetching coin detail:', error)
        throw error
      }
    },

    // 清除快取
    clearCache() {
      this.cache.clear()
      this.lastFetched = null
    },

    // 重新載入資料
    async refresh() {
      this.clearCache()
      this.resetPagination()
      await this.fetchCoins()
    }
  }
})

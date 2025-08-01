<template>
  <div class="coins-page">
    <NavbarItem />
    <div class="container">
      <!-- 頁面標題 -->
      <div class="page-header">
        <h1 class="page-title">幣種列表</h1>
        <p class="page-subtitle">探索全球加密貨幣市場</p>
      </div>

      <!-- 搜尋和篩選 -->
      <div class="search-section">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜尋幣種..."
            class="search-input"
            @input="handleSearch"
          />
        </div>
        
        <div class="filter-buttons">
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="setFilter(filter.value)"
            :class="['filter-btn', { active: currentFilter === filter.value }]"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <!-- 載入狀態 -->
      <div v-if="loading && !coins.length" class="loading-section">
        <div class="loading-spinner"></div>
        <p>載入幣種資料中...</p>
      </div>

      <!-- 幣種網格 -->
      <div v-else class="coins-grid">
        <div
          v-for="coin in displayedCoins"
          :key="coin.id"
          class="coin-card"
          @click="goToCoinDetail(coin.id)"
        >
          <div class="coin-header">
            <div class="coin-icon">
              {{ getCoinIcon(coin.symbol) }}
            </div>
            <div class="coin-info">
              <h3 class="coin-name">{{ coin.name }}</h3>
              <p class="coin-symbol">{{ coin.symbol.toUpperCase() }}</p>
            </div>
            <div class="coin-rank" v-if="coin.rank">
              #{{ coin.rank }}
            </div>
          </div>
          
          <div class="coin-details" v-if="coin.price">
            <div class="price-info">
              <span class="price-label">價格</span>
              <span class="price-value">${{ formatPrice(coin.price) }}</span>
            </div>
            <div class="change-info" :class="getChangeClass(coin.change_24h)">
              <span class="change-label">24h</span>
              <span class="change-value">{{ formatChange(coin.change_24h) }}</span>
            </div>
          </div>
          
          <div class="coin-details skeleton" v-else>
            <div class="skeleton-line"></div>
            <div class="skeleton-line"></div>
          </div>
        </div>
      </div>

      <!-- 載入更多按鈕 -->
      <div v-if="hasMore && !loading" class="load-more-section">
        <button @click="loadMore" class="btn btn-primary load-more-btn">
          <span v-if="!loadingMore">載入更多</span>
          <div v-else class="loading-spinner"></div>
        </button>
      </div>

      <!-- 無結果 -->
      <div v-if="!loading && !displayedCoins.length" class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>找不到相關幣種</h3>
        <p>請嘗試其他搜尋關鍵字</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCoinStore } from '../stores/coinStore'
import NavbarItem from '../components/Navbar.vue'

interface Coin {
  id: string
  name: string
  symbol: string
  rank?: number
  price?: number
  change_24h?: number
}

export default defineComponent({
  name: 'CoinList',
  components: {
    NavbarItem
  },
  setup() {
    const router = useRouter()
    const coinStore = useCoinStore()

    const filters = [
      { label: '全部', value: 'all' },
      { label: '前10名', value: 'top10' },
      { label: '前50名', value: 'top50' },
      { label: '前100名', value: 'top100' }
    ]

    // 使用store的getters
    const displayedCoins = computed(() => coinStore.displayedCoins)
    const loading = computed(() => coinStore.loading)
    const hasMore = computed(() => coinStore.hasMore)
    const searchQuery = computed(() => coinStore.searchQuery)
    const currentFilter = computed(() => coinStore.filter)

    // 格式化價格
    const formatPrice = (price: number) => {
      if (price < 0.01) return price.toFixed(6)
      if (price < 1) return price.toFixed(4)
      if (price < 100) return price.toFixed(2)
      return price.toLocaleString('en-US', { maximumFractionDigits: 2 })
    }

    // 格式化變化百分比
    const formatChange = (change: number) => {
      if (!change) return '0.00%'
      return `${change > 0 ? '+' : ''}${change.toFixed(2)}%`
    }

    // 取得變化樣式類別
    const getChangeClass = (change: number) => {
      if (!change) return 'neutral'
      return change > 0 ? 'positive' : 'negative'
    }

    // 取得幣種圖示
    const getCoinIcon = (symbol: string) => {
      const icons: { [key: string]: string } = {
        'btc': '₿',
        'eth': 'Ξ',
        'usdt': '💵',
        'usdc': '💵',
        'bnb': '🟡',
        'ada': '🔷',
        'sol': '☀️',
        'dot': '🔴',
        'doge': '🐕',
        'avax': '❄️'
      }
      return icons[symbol.toLowerCase()] || '🪙'
    }

    // 搜尋處理
    const handleSearch = () => {
      coinStore.setSearchQuery(searchQuery.value)
    }

    // 設定篩選
    const setFilter = (filter: string) => {
      coinStore.setFilter(filter)
    }

    // 載入更多
    const loadMore = async () => {
      await coinStore.loadMore()
    }

    // 前往幣種詳情
    const goToCoinDetail = (coinId: string) => {
      router.push({ name: 'CoinDetail', params: { id: coinId } })
    }

    // 監聽搜尋變化
    watch(searchQuery, () => {
      handleSearch()
    })

    onMounted(() => {
      coinStore.fetchCoins()
    })

    return {
      coins,
      loading,
      loadingMore,
      searchQuery,
      currentFilter,
      filters,
      displayedCoins,
      hasMore,
      formatPrice,
      formatChange,
      getChangeClass,
      getCoinIcon,
      handleSearch,
      setFilter,
      loadMore,
      goToCoinDetail
    }
  }
})
</script>

<style scoped>
.coins-page {
  min-height: 100vh;
  padding: var(--spacing-xl) 0;
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: var(--spacing-sm);
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.search-section {
  margin-bottom: var(--spacing-2xl);
}

.search-box {
  position: relative;
  max-width: 400px;
  margin: 0 auto var(--spacing-lg);
}

.search-icon {
  position: absolute;
  left: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 1.1rem;
}

.search-input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) 3rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.filter-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.loading-section {
  text-align: center;
  padding: var(--spacing-2xl);
}

.loading-section p {
  margin-top: var(--spacing-md);
  color: var(--text-secondary);
}

.coins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.coin-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.coin-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.coin-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.coin-card:hover::before {
  transform: scaleX(1);
}

.coin-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.coin-icon {
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(99, 102, 241, 0.1);
  border-radius: var(--radius-md);
}

.coin-info {
  flex: 1;
}

.coin-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.coin-symbol {
  color: var(--text-muted);
  font-size: 0.875rem;
  font-weight: 500;
}

.coin-rank {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
}

.coin-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-info,
.change-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.price-label,
.change-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.price-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.change-value {
  font-size: 1rem;
  font-weight: 600;
}

.change-value.positive {
  color: #10b981;
}

.change-value.negative {
  color: #ef4444;
}

.change-value.neutral {
  color: var(--text-secondary);
}

.skeleton-line {
  height: 1rem;
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-sm);
}

.load-more-section {
  text-align: center;
}

.load-more-btn {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: 1rem;
}

.no-results {
  text-align: center;
  padding: var(--spacing-2xl);
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
}

.no-results h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.no-results p {
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .coins-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
  
  .coin-card {
    padding: var(--spacing-md);
  }
  
  .filter-buttons {
    gap: var(--spacing-xs);
  }
  
  .filter-btn {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.8rem;
  }
}
</style>

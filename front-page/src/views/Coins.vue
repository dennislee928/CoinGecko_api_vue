<template>
  <div class="coins-page">
    <!-- 背景動畫效果 -->
    <div class="cyberpunk-bg">
      <div class="grid-overlay"></div>
      <div class="scan-lines"></div>
      <div class="glitch-overlay"></div>
    </div>
    
    <NavbarItem />
    <div class="container">
      <!-- 頁面標題 -->
      <div class="page-header">
        <div class="title-container">
          <h1 class="page-title cyberpunk-text">
            <span class="glitch-text" data-text="幣種列表">幣種列表</span>
            <span class="japanese-text">コイン</span>
          </h1>
          <div class="title-underline"></div>
        </div>
        <p class="page-subtitle neon-text">{{ t('page.coinListSubtitle') }}</p>
        <div class="cyber-city-silhouette"></div>
      </div>

      <!-- 搜尋和篩選 -->
      <div class="search-section">
        <div class="search-box cyber-search">
          <span class="search-icon neon-icon">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('coins.searchPlaceholder')"
            class="search-input cyber-input"
            @input="
              (event) => coinStore.setSearchQuery((event.target as HTMLInputElement)?.value || '')
            "
          />
        </div>

        <div class="filter-buttons">
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="setFilter(filter.value)"
            :class="['filter-btn cyber-btn', { active: currentFilter === filter.value }]"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <!-- 載入狀態 -->
      <div v-if="loading && !displayedCoins.length" class="loading-section">
        <div class="cyberpunk-spinner">
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
        </div>
        <p class="loading-text">{{ t('coins.loading') }}</p>
      </div>

      <!-- 幣種網格 -->
      <div v-else class="coins-grid">
        <div
          v-for="coin in displayedCoins"
          :key="coin.id"
          class="coin-card cyber-card"
          @click="goToCoinDetail(coin.id)"
        >
          <div class="card-glow"></div>
          <div class="card-crack"></div>
          <div class="coin-header">
            <div class="coin-icon neon-icon">
              {{ getCoinIcon(coin.symbol) }}
            </div>
            <div class="coin-info">
              <h3 class="coin-name cyber-name">{{ coin.name }}</h3>
              <p class="coin-symbol cyber-symbol">{{ coin.symbol.toUpperCase() }}</p>
            </div>
            <div class="coin-rank cyber-rank" v-if="coin.rank">#{{ coin.rank }}</div>
          </div>

          <div class="coin-details" v-if="coin.price">
            <div class="price-info">
              <span class="price-label cyber-label">{{ t('coins.price') }}</span>
              <span class="price-value cyber-value">${{ formatPrice(coin.price) }}</span>
            </div>
            <div class="change-info" :class="getChangeClass(coin.change_24h)">
              <span class="change-label cyber-label">{{ t('coins.change24h') }}</span>
              <span class="change-value cyber-change-value">{{ formatChange(coin.change_24h) }}</span>
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
        <button @click="loadMore" class="cyber-button load-more-btn">
          <span class="button-text">{{ t('coins.loadMore') }}</span>
          <div class="button-glow"></div>
        </button>
      </div>

      <!-- 無結果 -->
      <div v-if="!loading && !displayedCoins.length" class="no-results cyber-error">
        <div class="no-results-icon cyber-error-icon">🔍</div>
        <h3 class="cyber-error-title">{{ t('coins.noResults') }}</h3>
        <p class="cyber-error-text">{{ t('coins.noResultsMessage') }}</p>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCoinStore } from '../stores/coinStore'
import NavbarItem from '../components/Navbar.vue'
import AppFooter from '../components/Footer.vue'

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
    NavbarItem,
    AppFooter
  },
  setup() {
    const router = useRouter()
    const { t } = useI18n()
    const coinStore = useCoinStore()

    const filters = computed(() => [
      { label: t('coins.filters.all'), value: 'all' },
      { label: t('coins.filters.top10'), value: 'top10' },
      { label: t('coins.filters.top50'), value: 'top50' },
      { label: t('coins.filters.top100'), value: 'top100' }
    ])

    // 使用store的getters
    const displayedCoins = computed(() => coinStore.displayedCoins)
    const loading = computed(() => coinStore.loading)
    const hasMore = computed(() => coinStore.hasMore)
    const searchQuery = computed(() => coinStore.searchQuery)
    const currentFilter = computed(() => coinStore.filter)

    // 格式化價格
    const formatPrice = (price: number | undefined) => {
      if (!price) return '0.00'
      if (price < 0.01) return price.toFixed(6)
      if (price < 1) return price.toFixed(4)
      if (price < 100) return price.toFixed(2)
      return price.toLocaleString('en-US', { maximumFractionDigits: 2 })
    }

    // 格式化變化百分比
    const formatChange = (change: number | undefined) => {
      if (!change) return '0.00%'
      return `${change > 0 ? '+' : ''}${change.toFixed(2)}%`
    }

    // 取得變化樣式類別
    const getChangeClass = (change: number | undefined) => {
      if (!change) return 'neutral'
      return change > 0 ? 'positive' : 'negative'
    }

    // 取得幣種圖示
    const getCoinIcon = (symbol: string) => {
      const icons: { [key: string]: string } = {
        btc: '₿',
        eth: 'Ξ',
        usdt: '💵',
        usdc: '💵',
        bnb: '🟡',
        ada: '🔷',
        sol: '☀️',
        dot: '🔴',
        doge: '🐕',
        avax: '❄️'
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
      t,
      coinStore,
      filters,
      displayedCoins,
      loading,
      hasMore,
      searchQuery,
      currentFilter,
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
  position: relative;
  overflow: hidden;
}

.cyberpunk-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: #0a0a0a;
  background-size: 100px 100px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-position: -1px -1px;
  opacity: 0.1;
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 100px 100px;
  opacity: 0.05;
  pointer-events: none;
}

.scan-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 100% 10px;
  animation: scan 6s linear infinite;
  opacity: 0.1;
  pointer-events: none;
}

.glitch-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="url(#noise)"/><defs><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter></defs></svg>')
    repeat;
  background-size: 100px 100px;
  opacity: 0.05;
  pointer-events: none;
  mix-blend-mode: overlay;
}

@keyframes scan {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(100%);
  }
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  position: relative;
}

.title-container {
  position: relative;
  margin-bottom: var(--spacing-sm);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ff006e, #8338ec);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: var(--spacing-sm);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.glitch-text {
  color: transparent;
  white-space: pre;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ff006e, #8338ec);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: glitch 0.5s infinite;
  text-shadow: 
    2px 0 #ff006e,
    -2px 0 #8338ec,
    0 2px #ff006e,
    0 -2px #8338ec;
}

.japanese-text {
  font-size: 1.5rem;
  font-weight: 600;
  background: linear-gradient(135deg, #ff006e, #3a86ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: neonPulse 2s ease-in-out infinite alternate;
  text-shadow: 
    0 0 5px #ff006e,
    0 0 10px #ff006e,
    0 0 15px #ff006e;
}

@keyframes glitch {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
}

@keyframes neonPulse {
  0% {
    text-shadow: 
      0 0 5px #ff006e,
      0 0 10px #ff006e,
      0 0 15px #ff006e;
  }
  100% {
    text-shadow: 
      0 0 10px #ff006e,
      0 0 20px #ff006e,
      0 0 30px #ff006e;
  }
}

.title-underline {
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, #ff006e, #8338ec);
  border-radius: var(--radius-sm);
  opacity: 0.8;
  animation: underlineGlow 2s ease-in-out infinite alternate;
}

@keyframes underlineGlow {
  0% {
    box-shadow: 0 0 5px #ff006e;
  }
  100% {
    box-shadow: 0 0 15px #ff006e, 0 0 25px #8338ec;
  }
}

.cyber-city-silhouette {
  position: absolute;
  bottom: -50px;
  left: 0;
  width: 100%;
  height: 100px;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100"><defs><linearGradient id="cityGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:%23ff006e;stop-opacity:0.3"/><stop offset="50%" style="stop-color:%233a86ff;stop-opacity:0.3"/><stop offset="100%" style="stop-color:%23ff006e;stop-opacity:0.3"/></linearGradient></defs><path d="M0,100 L0,80 L50,60 L100,70 L150,40 L200,50 L250,30 L300,45 L350,25 L400,35 L450,20 L500,30 L550,15 L600,25 L650,10 L700,20 L750,5 L800,15 L850,8 L900,12 L950,3 L1000,8 L1050,2 L1100,5 L1150,1 L1200,3 L1200,100 Z" fill="url(%23cityGrad)"/></svg>');
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.6;
  animation: cityFloat 8s ease-in-out infinite;
  pointer-events: none;
}

@keyframes cityFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-top: var(--spacing-sm);
}

.neon-text {
  text-shadow: 
    0 0 5px #ff006e,
    0 0 10px #ff006e,
    0 0 15px #ff006e;
}

.search-section {
  margin-bottom: var(--spacing-2xl);
}

.cyber-search {
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

.neon-icon {
  text-shadow: 
    0 0 5px #ff006e,
    0 0 10px #ff006e,
    0 0 15px #ff006e;
  animation: iconPulse 2s ease-in-out infinite alternate;
}

@keyframes iconPulse {
  0% {
    text-shadow: 
      0 0 5px #ff006e,
      0 0 10px #ff006e,
      0 0 15px #ff006e;
  }
  100% {
    text-shadow: 
      0 0 10px #ff006e,
      0 0 20px #ff006e,
      0 0 30px #ff006e;
  }
}

.cyber-input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) 3rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, rgba(255, 0, 110, 0.1), rgba(131, 56, 236, 0.1));
}

.cyber-input:focus {
  outline: none;
  border-color: #ff006e;
  box-shadow: 0 0 0 3px rgba(255, 0, 110, 0.1);
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.cyber-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  background: linear-gradient(135deg, rgba(255, 0, 110, 0.1), rgba(131, 56, 236, 0.1));
}

.cyber-btn:hover,
.cyber-btn.active {
  background: linear-gradient(135deg, #ff006e, #8338ec);
  color: white;
  border-color: #ff006e;
  box-shadow: 0 0 10px rgba(255, 0, 110, 0.3);
}

.loading-section {
  text-align: center;
  padding: var(--spacing-2xl);
  position: relative;
}

.cyberpunk-spinner {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: var(--spacing-md);
}

.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top-color: #ff006e;
  border-radius: 50%;
  animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.spinner-ring:nth-child(1) {
  animation-delay: -0.4s;
}
.spinner-ring:nth-child(2) {
  animation-delay: -0.3s;
}
.spinner-ring:nth-child(3) {
  animation-delay: -0.2s;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: rotate(180deg);
    opacity: 0.3;
  }
  100% {
    transform: rotate(360deg);
    opacity: 0.7;
  }
}

.loading-text {
  margin-top: var(--spacing-md);
  color: var(--text-secondary);
}

.coins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.cyber-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(255, 0, 110, 0.1), rgba(131, 56, 236, 0.1));
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 0, 110, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.card-crack {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(45deg, transparent 40%, rgba(255, 0, 110, 0.3) 40%, rgba(255, 0, 110, 0.3) 60%, transparent 60%),
    linear-gradient(-45deg, transparent 40%, rgba(58, 134, 255, 0.3) 40%, rgba(58, 134, 255, 0.3) 60%, transparent 60%);
  background-size: 20px 20px;
  opacity: 0;
  animation: crackFlash 3s ease-in-out infinite;
  pointer-events: none;
}

@keyframes crackFlash {
  0%, 90% {
    opacity: 0;
  }
  95% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.cyber-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #ff006e, #8338ec);
  transform: scaleX(0);
  transition: transform 0.3s ease;
  animation: borderGlow 2s ease-in-out infinite alternate;
}

@keyframes borderGlow {
  0% {
    box-shadow: 0 0 5px #ff006e;
  }
  100% {
    box-shadow: 0 0 15px #ff006e, 0 0 25px #8338ec;
  }
}

.cyber-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: #ff006e;
}

.cyber-card:hover .card-glow {
  opacity: 1;
}

.cyber-card:hover::before {
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
  background: rgba(255, 0, 110, 0.1);
  border-radius: var(--radius-md);
}

.cyber-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  text-shadow: 0 0 5px rgba(255, 0, 110, 0.3);
}

.cyber-symbol {
  color: var(--text-muted);
  font-size: 0.875rem;
  font-weight: 500;
}

.cyber-rank {
  background: linear-gradient(135deg, #ff006e, #8338ec);
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 0 5px rgba(255, 0, 110, 0.3);
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

.cyber-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cyber-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  text-shadow: 0 0 5px rgba(255, 0, 110, 0.3);
}

.cyber-change-value {
  font-size: 1rem;
  font-weight: 600;
}

.cyber-change-value.positive {
  color: #10b981;
  text-shadow: 0 0 5px rgba(16, 185, 129, 0.3);
}

.cyber-change-value.negative {
  color: #ef4444;
  text-shadow: 0 0 5px rgba(239, 68, 68, 0.3);
}

.cyber-change-value.neutral {
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

.cyber-button {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: 1rem;
  background: linear-gradient(135deg, #ff006e, #8338ec);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.cyber-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(255, 0, 110, 0.3);
}

.button-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.cyber-button:hover .button-glow {
  opacity: 1;
}

.cyber-error {
  text-align: center;
  padding: var(--spacing-2xl);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
}

.cyber-error::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #ff006e, #8338ec);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.cyber-error:hover::before {
  transform: scaleX(1);
}

.cyber-error-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
  text-shadow: 0 0 10px rgba(255, 0, 110, 0.5);
}

.cyber-error-title {
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.cyber-error-text {
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.3rem;
  }

  .japanese-text {
    font-size: 1.2rem;
  }

  .cyber-city-silhouette {
    height: 60px;
    bottom: -30px;
  }

  .coins-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .cyber-card {
    padding: var(--spacing-md);
  }

  .filter-buttons {
    gap: var(--spacing-xs);
  }

  .cyber-btn {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.8rem;
  }

  .coin-icon {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }

  .cyber-value {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.5rem;
  }

  .japanese-text {
    font-size: 1rem;
  }

  .cyber-city-silhouette {
    height: 40px;
    bottom: -20px;
  }

  .cyber-card {
    padding: var(--spacing-sm);
  }

  .coin-icon {
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
  }

  .cyber-value {
    font-size: 0.9rem;
  }
}
</style>

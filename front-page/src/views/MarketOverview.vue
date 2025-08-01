<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="market-page">
    <NavbarItem />
    <div class="container">
      <!-- 頁面標題 -->
      <div class="page-header">
        <h1 class="page-title">{{ t('page.marketOverview') }}</h1>
        <p class="page-subtitle">{{ t('page.marketOverviewSubtitle') }}</p>
      </div>

      <!-- 載入狀態 -->
      <div v-if="loading" class="loading-section">
        <div class="loading-spinner"></div>
        <p>{{ t('market.loading') }}</p>
      </div>

      <!-- 市場數據 -->
      <div v-else-if="marketData" class="market-content">
        <!-- 即時BTC價格 -->
        <LiveBTCPrice />

        <!-- 主要指標卡片 -->
        <div class="key-metrics">
          <div class="metric-card primary">
            <div class="metric-icon">💰</div>
            <div class="metric-content">
              <h3 class="metric-label">{{ t('market.totalMarketCap') }}</h3>
              <p class="metric-value">${{ formatNumber(marketData.market_cap_usd) }}</p>
              <span class="metric-change" :class="getChangeClass(marketData.market_cap_change_24h)">
                {{ formatChange(marketData.market_cap_change_24h) }}
              </span>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-icon">📈</div>
            <div class="metric-content">
              <h3 class="metric-label">{{ t('market.volume24h') }}</h3>
              <p class="metric-value">${{ formatNumber(marketData.volume_24h_usd) }}</p>
              <span class="metric-change" :class="getChangeClass(marketData.volume_24h_change_24h)">
                {{ formatChange(marketData.volume_24h_change_24h) }}
              </span>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-icon">₿</div>
            <div class="metric-content">
              <h3 class="metric-label">{{ t('market.bitcoinDominance') }}</h3>
              <p class="metric-value">{{ marketData.bitcoin_dominance_percentage }}%</p>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-icon">🪙</div>
            <div class="metric-content">
              <h3 class="metric-label">{{ t('market.activeCoins') }}</h3>
              <p class="metric-value">{{ formatNumber(marketData.cryptocurrencies_number) }}</p>
            </div>
          </div>
        </div>

        <!-- 詳細數據表格 -->
        <div class="market-details">
          <div class="details-header">
            <h2>{{ t('market.marketDetails') }}</h2>
            <router-link to="/coins" class="btn btn-primary">
              <span>{{ t('market.viewCoinList') }}</span>
              <span class="arrow">→</span>
            </router-link>
          </div>

          <div class="details-grid">
            <div class="detail-card">
              <h4>歷史最高市值</h4>
              <p class="detail-value">${{ formatNumber(marketData.market_cap_ath_value) }}</p>
              <p class="detail-date">{{ formatDate(marketData.market_cap_ath_date) }}</p>
            </div>

            <div class="detail-card">
              <h4>歷史最高交易量</h4>
              <p class="detail-value">${{ formatNumber(marketData.volume_24h_ath_value) }}</p>
              <p class="detail-date">{{ formatDate(marketData.volume_24h_ath_date) }}</p>
            </div>

            <div class="detail-card">
              <h4>距離歷史最高市值</h4>
              <p class="detail-value">{{ marketData.market_cap_percent_from_ath }}%</p>
              <p class="detail-subtitle">從歷史高點下跌</p>
            </div>

            <div class="detail-card">
              <h4>距離歷史最高交易量</h4>
              <p class="detail-value">{{ marketData.volume_24h_percent_from_ath }}%</p>
              <p class="detail-subtitle">從歷史高點下跌</p>
            </div>

            <div class="detail-card">
              <h4>距離歷史最高交易量</h4>
              <p class="detail-value">{{ marketData.volume_24h_percent_to_ath }}%</p>
              <p class="detail-subtitle">距離歷史高點</p>
            </div>

            <div class="detail-card">
              <h4>最後更新</h4>
              <p class="detail-value">{{ formatDateTime(marketData.last_updated) }}</p>
            </div>
          </div>
        </div>

        <!-- 市場趨勢圖表 -->
        <div class="market-trends">
          <h2>市場趨勢</h2>
          <div class="trends-grid">
            <div class="trend-card">
              <div class="trend-header">
                <h4>市值變化</h4>
                <span
                  class="trend-indicator"
                  :class="getTrendClass(marketData.market_cap_change_24h)"
                >
                  {{ marketData.market_cap_change_24h > 0 ? '↗' : '↘' }}
                </span>
              </div>
              <div class="trend-bar">
                <div
                  class="trend-fill"
                  :class="getTrendClass(marketData.market_cap_change_24h)"
                  :style="{ width: Math.abs(marketData.market_cap_change_24h) + '%' }"
                ></div>
              </div>
              <p class="trend-value">{{ formatChange(marketData.market_cap_change_24h) }}</p>
            </div>

            <div class="trend-card">
              <div class="trend-header">
                <h4>交易量變化</h4>
                <span
                  class="trend-indicator"
                  :class="getTrendClass(marketData.volume_24h_change_24h)"
                >
                  {{ marketData.volume_24h_change_24h > 0 ? '↗' : '↘' }}
                </span>
              </div>
              <div class="trend-bar">
                <div
                  class="trend-fill"
                  :class="getTrendClass(marketData.volume_24h_change_24h)"
                  :style="{ width: Math.abs(marketData.volume_24h_change_24h) + '%' }"
                ></div>
              </div>
              <p class="trend-value">{{ formatChange(marketData.volume_24h_change_24h) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 錯誤狀態 -->
      <div v-else class="error-section">
        <div class="error-icon">⚠️</div>
        <h3>載入失敗</h3>
        <p>無法載入市場數據，請稍後再試</p>
        <button @click="fetchMarketData" class="btn btn-primary">重新載入</button>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import NavbarItem from '../components/Navbar.vue'
import LiveBTCPrice from '../components/LiveBTCPrice.vue'
import AppFooter from '../components/Footer.vue'

interface MarketData {
  market_cap_usd: number
  volume_24h_usd: number
  bitcoin_dominance_percentage: number
  cryptocurrencies_number: number
  market_cap_ath_value: number
  market_cap_ath_date: string
  volume_24h_ath_value: number
  volume_24h_ath_date: string
  volume_24h_percent_from_ath: number
  volume_24h_percent_to_ath: number
  market_cap_change_24h: number
  volume_24h_change_24h: number
  last_updated: number
  market_cap_percent_from_ath: number
}

export default defineComponent({
  name: 'MarketOverview',
  components: {
    NavbarItem,
    LiveBTCPrice,
    AppFooter
  },
  setup() {
    const { t } = useI18n()
    const marketData = ref<MarketData | null>(null)
    const loading = ref(true)

    // 格式化數字
    const formatNumber = (num: number) => {
      if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T'
      if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
      if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
      if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K'
      return num.toLocaleString()
    }

    // 格式化變化百分比
    const formatChange = (change: number) => {
      if (!change) return '0.00%'
      return `${change > 0 ? '+' : ''}${change.toFixed(2)}%`
    }

    // 格式化日期
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('zh-TW')
    }

    // 格式化日期時間
    const formatDateTime = (timestamp: number) => {
      return new Date(timestamp * 1000).toLocaleString('zh-TW')
    }

    // 取得變化樣式類別
    const getChangeClass = (change: number) => {
      if (!change) return 'neutral'
      return change > 0 ? 'positive' : 'negative'
    }

    // 取得趨勢樣式類別
    const getTrendClass = (change: number) => {
      if (!change) return 'neutral'
      return change > 0 ? 'positive' : 'negative'
    }

    // 載入市場數據
    const fetchMarketData = async () => {
      try {
        loading.value = true
        const response = await fetch('https://api.coinpaprika.com/v1/global')
        if (!response.ok) throw new Error('Network response was not ok')

        const data = await response.json()
        marketData.value = data
      } catch (error) {
        console.error('Error fetching market data:', error)
        marketData.value = null
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchMarketData()
    })

    return {
      t,
      marketData,
      loading,
      formatNumber,
      formatChange,
      formatDate,
      formatDateTime,
      getChangeClass,
      getTrendClass,
      fetchMarketData
    }
  }
})
</script>

<style scoped>
.market-page {
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

.loading-section {
  text-align: center;
  padding: var(--spacing-2xl);
}

.loading-section p {
  margin-top: var(--spacing-md);
  color: var(--text-secondary);
}

.market-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}

.key-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.metric-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.metric-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.metric-card.primary::before {
  transform: scaleX(1);
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.metric-card:hover::before {
  transform: scaleX(1);
}

.metric-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(99, 102, 241, 0.1);
  border-radius: var(--radius-lg);
  flex-shrink: 0;
}

.metric-content {
  flex: 1;
}

.metric-label {
  font-size: 0.875rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--spacing-xs);
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.metric-change {
  font-size: 0.875rem;
  font-weight: 600;
}

.metric-change.positive {
  color: #10b981;
}

.metric-change.negative {
  color: #ef4444;
}

.metric-change.neutral {
  color: var(--text-secondary);
}

.market-details {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
}

.details-header h2 {
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 600;
}

.details-header .btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.arrow {
  transition: transform 0.3s ease;
}

.btn:hover .arrow {
  transform: translateX(4px);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

.detail-card {
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.detail-card h4 {
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--spacing-sm);
}

.detail-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.detail-date,
.detail-subtitle {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.market-trends {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
}

.market-trends h2 {
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: var(--spacing-xl);
}

.trends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.trend-card {
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.trend-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.trend-header h4 {
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.trend-indicator {
  font-size: 1.25rem;
  font-weight: 600;
}

.trend-indicator.positive {
  color: #10b981;
}

.trend-indicator.negative {
  color: #ef4444;
}

.trend-indicator.neutral {
  color: var(--text-secondary);
}

.trend-bar {
  width: 100%;
  height: 8px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
  overflow: hidden;
  margin-bottom: var(--spacing-sm);
}

.trend-fill {
  height: 100%;
  border-radius: var(--radius-sm);
  transition: width 0.3s ease;
}

.trend-fill.positive {
  background: linear-gradient(90deg, #10b981, #34d399);
}

.trend-fill.negative {
  background: linear-gradient(90deg, #ef4444, #f87171);
}

.trend-fill.neutral {
  background: var(--text-muted);
}

.trend-value {
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
}

.trend-value.positive {
  color: #10b981;
}

.trend-value.negative {
  color: #ef4444;
}

.trend-value.neutral {
  color: var(--text-secondary);
}

.error-section {
  text-align: center;
  padding: var(--spacing-2xl);
}

.error-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
}

.error-section h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.error-section p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .key-metrics {
    grid-template-columns: 1fr;
  }

  .details-header {
    flex-direction: column;
    gap: var(--spacing-md);
    align-items: flex-start;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .trends-grid {
    grid-template-columns: 1fr;
  }

  .metric-card {
    padding: var(--spacing-md);
  }

  .metric-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }

  .metric-value {
    font-size: 1.25rem;
  }
}
</style>

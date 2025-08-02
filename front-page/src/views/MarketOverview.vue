<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="market-page">
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
            <span class="glitch-text" data-text="市場概覽">市場概覽</span>
          </h1>
          <div class="title-underline"></div>
        </div>
        <p class="page-subtitle neon-text">{{ t('page.marketOverviewSubtitle') }}</p>
      </div>

      <!-- 載入狀態 -->
      <div v-if="loading" class="loading-section">
        <div class="cyberpunk-spinner">
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
        </div>
        <p class="loading-text">{{ t('market.loading') }}</p>
      </div>

      <!-- 市場數據 -->
      <div v-else-if="marketData" class="market-content">
        <!-- 即時BTC價格 -->
        <LiveBTCPrice />

        <!-- 主要指標卡片 -->
        <div class="key-metrics">
          <div class="metric-card primary cyber-card">
            <div class="card-glow"></div>
            <div class="metric-icon neon-icon">💰</div>
            <div class="metric-content">
              <h3 class="metric-label cyber-label">{{ t('market.totalMarketCap') }}</h3>
              <p class="metric-value cyber-value">${{ formatNumber(marketData.market_cap_usd) }}</p>
              <span class="metric-change" :class="getChangeClass(marketData.market_cap_change_24h)">
                {{ formatChange(marketData.market_cap_change_24h) }}
              </span>
            </div>
            <div class="card-border"></div>
          </div>

          <div class="metric-card cyber-card">
            <div class="card-glow"></div>
            <div class="metric-icon neon-icon">📈</div>
            <div class="metric-content">
              <h3 class="metric-label cyber-label">{{ t('market.volume24h') }}</h3>
              <p class="metric-value cyber-value">${{ formatNumber(marketData.volume_24h_usd) }}</p>
              <span class="metric-change" :class="getChangeClass(marketData.volume_24h_change_24h)">
                {{ formatChange(marketData.volume_24h_change_24h) }}
              </span>
            </div>
            <div class="card-border"></div>
          </div>

          <div class="metric-card cyber-card">
            <div class="card-glow"></div>
            <div class="metric-icon neon-icon">₿</div>
            <div class="metric-content">
              <h3 class="metric-label cyber-label">{{ t('market.bitcoinDominance') }}</h3>
              <p class="metric-value cyber-value">{{ marketData.bitcoin_dominance_percentage }}%</p>
            </div>
            <div class="card-border"></div>
          </div>

          <div class="metric-card cyber-card">
            <div class="card-glow"></div>
            <div class="metric-icon neon-icon">🪙</div>
            <div class="metric-content">
              <h3 class="metric-label cyber-label">{{ t('market.activeCoins') }}</h3>
              <p class="metric-value cyber-value">
                {{ formatNumber(marketData.cryptocurrencies_number) }}
              </p>
            </div>
            <div class="card-border"></div>
          </div>
        </div>

        <!-- 詳細數據表格 -->
        <div class="market-details cyber-panel">
          <div class="panel-header">
            <h2 class="cyber-title">{{ t('market.marketDetails') }}</h2>
            <router-link to="/coins" class="cyber-button">
              <span class="button-text">{{ t('market.viewCoinList') }}</span>
              <span class="button-arrow">→</span>
              <div class="button-glow"></div>
            </router-link>
          </div>

          <div class="details-grid">
            <div class="detail-card cyber-detail">
              <div class="detail-glow"></div>
              <h4 class="cyber-detail-label">歷史最高市值</h4>
              <p class="detail-value cyber-detail-value">
                ${{ formatNumber(marketData.market_cap_ath_value) }}
              </p>
              <p class="detail-date cyber-detail-date">
                {{ formatDate(marketData.market_cap_ath_date) }}
              </p>
            </div>

            <div class="detail-card cyber-detail">
              <div class="detail-glow"></div>
              <h4 class="cyber-detail-label">歷史最高交易量</h4>
              <p class="detail-value cyber-detail-value">
                ${{ formatNumber(marketData.volume_24h_ath_value) }}
              </p>
              <p class="detail-date cyber-detail-date">
                {{ formatDate(marketData.volume_24h_ath_date) }}
              </p>
            </div>

            <div class="detail-card cyber-detail">
              <div class="detail-glow"></div>
              <h4 class="cyber-detail-label">距離歷史最高市值</h4>
              <p class="detail-value cyber-detail-value">
                {{ marketData.market_cap_percent_from_ath }}%
              </p>
              <p class="detail-subtitle cyber-detail-subtitle">從歷史高點下跌</p>
            </div>

            <div class="detail-card cyber-detail">
              <div class="detail-glow"></div>
              <h4 class="cyber-detail-label">距離歷史最高交易量</h4>
              <p class="detail-value cyber-detail-value">
                {{ marketData.volume_24h_percent_from_ath }}%
              </p>
              <p class="detail-subtitle cyber-detail-subtitle">從歷史高點下跌</p>
            </div>

            <div class="detail-card cyber-detail">
              <div class="detail-glow"></div>
              <h4 class="cyber-detail-label">距離歷史最高交易量</h4>
              <p class="detail-value cyber-detail-value">
                {{ marketData.volume_24h_percent_to_ath }}%
              </p>
              <p class="detail-subtitle cyber-detail-subtitle">距離歷史高點</p>
            </div>

            <div class="detail-card cyber-detail">
              <div class="detail-glow"></div>
              <h4 class="cyber-detail-label">最後更新</h4>
              <p class="detail-value cyber-detail-value">
                {{ formatDateTime(marketData.last_updated) }}
              </p>
            </div>
          </div>
        </div>

        <!-- 市場趨勢圖表 -->
        <div class="market-trends cyber-panel">
          <h2 class="cyber-title">市場趨勢</h2>
          <div class="trends-grid">
            <div class="trend-card cyber-trend">
              <div class="trend-glow"></div>
              <div class="trend-header">
                <h4 class="cyber-trend-label">市值變化</h4>
                <span
                  class="trend-indicator cyber-indicator"
                  :class="getTrendClass(marketData.market_cap_change_24h)"
                >
                  {{ marketData.market_cap_change_24h > 0 ? '↗' : '↘' }}
                </span>
              </div>
              <div class="trend-bar cyber-bar">
                <div
                  class="trend-fill"
                  :class="getTrendClass(marketData.market_cap_change_24h)"
                  :style="{ width: Math.abs(marketData.market_cap_change_24h) + '%' }"
                ></div>
              </div>
              <p
                class="trend-value cyber-trend-value"
                :class="getTrendClass(marketData.market_cap_change_24h)"
              >
                {{ formatChange(marketData.market_cap_change_24h) }}
              </p>
            </div>

            <div class="trend-card cyber-trend">
              <div class="trend-glow"></div>
              <div class="trend-header">
                <h4 class="cyber-trend-label">交易量變化</h4>
                <span
                  class="trend-indicator cyber-indicator"
                  :class="getTrendClass(marketData.volume_24h_change_24h)"
                >
                  {{ marketData.volume_24h_change_24h > 0 ? '↗' : '↘' }}
                </span>
              </div>
              <div class="trend-bar cyber-bar">
                <div
                  class="trend-fill"
                  :class="getTrendClass(marketData.volume_24h_change_24h)"
                  :style="{ width: Math.abs(marketData.volume_24h_change_24h) + '%' }"
                ></div>
              </div>
              <p
                class="trend-value cyber-trend-value"
                :class="getTrendClass(marketData.volume_24h_change_24h)"
              >
                {{ formatChange(marketData.volume_24h_change_24h) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 錯誤狀態 -->
      <div v-else class="error-section cyber-error">
        <div class="error-icon cyber-error-icon">⚠️</div>
        <h3 class="cyber-error-title">載入失敗</h3>
        <p class="cyber-error-text">無法載入市場數據，請稍後再試</p>
        <button @click="fetchMarketData" class="cyber-button error-button">
          <span class="button-text">重新載入</span>
          <div class="button-glow"></div>
        </button>
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
  position: relative; /* Added for background positioning */
  overflow: hidden; /* Added for background overflow */
}

.cyberpunk-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Ensure it's behind other content */
  background-color: #0a0a0a; /* Dark background for the cyberpunk effect */
  background-size: 100px 100px; /* Grid overlay */
  background-image: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-position: -1px -1px;
  opacity: 0.1; /* Adjust as needed for background effect */
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
  position: relative; /* Added for title underline positioning */
}

.title-container {
  position: relative;
  margin-bottom: var(--spacing-sm);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: var(--spacing-sm);
}

.glitch-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: transparent;
  white-space: pre;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: glitch 0.5s infinite;
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

.title-underline {
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  border-radius: var(--radius-sm);
  opacity: 0.5;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-top: var(--spacing-sm);
}

.neon-text {
  text-shadow:
    0 0 5px var(--primary-color),
    0 0 10px var(--primary-color),
    0 0 15px var(--primary-color);
}

.loading-section {
  text-align: center;
  padding: var(--spacing-2xl);
  position: relative; /* Added for spinner positioning */
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
  border-top-color: var(--primary-color);
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

.market-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
  position: relative; /* Added for panel positioning */
}

.cyber-panel {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  position: relative; /* Added for glow positioning */
  overflow: hidden; /* Added for glow overflow */
}

.cyber-panel::before {
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

.cyber-panel.primary::before {
  transform: scaleX(1);
}

.cyber-panel:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.cyber-panel:hover::before {
  transform: scaleX(1);
}

.cyber-panel .panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  position: relative; /* Added for button positioning */
}

.cyber-panel .panel-header .cyber-title {
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 600;
  position: relative; /* Added for underline positioning */
}

.cyber-panel .panel-header .cyber-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  border-radius: var(--radius-sm);
  opacity: 0.5;
}

.cyber-panel .panel-header .cyber-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  position: relative; /* Added for glow positioning */
}

.cyber-panel .panel-header .cyber-button .button-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.cyber-panel .panel-header .cyber-button:hover .button-text {
  color: var(--primary-color);
}

.cyber-panel .panel-header .cyber-button .button-arrow {
  transition: transform 0.3s ease;
}

.cyber-panel .panel-header .cyber-button:hover .button-arrow {
  transform: translateX(4px);
}

.cyber-panel .panel-header .cyber-button .button-glow {
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

.cyber-panel .panel-header .cyber-button:hover .button-glow {
  opacity: 1;
}

.cyber-panel .panel-header .cyber-button .error-button {
  background-color: var(--primary-color);
  color: white;
  padding: 8px 15px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
  position: relative; /* Added for glow positioning */
}

.cyber-panel .panel-header .cyber-button .error-button:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

.cyber-panel .panel-header .cyber-button .error-button .button-glow {
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

.cyber-panel .panel-header .cyber-button .error-button:hover .button-glow {
  opacity: 1;
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

.cyber-card {
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

.cyber-card::before {
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

.cyber-card.primary::before {
  transform: scaleX(1);
}

.cyber-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.cyber-card:hover::before {
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

.neon-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, var(--primary-color), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border-radius: var(--radius-lg);
  flex-shrink: 0;
  text-shadow:
    0 0 5px var(--primary-color),
    0 0 10px var(--primary-color),
    0 0 15px var(--primary-color);
}

.metric-content {
  flex: 1;
}

.cyber-label {
  font-size: 0.875rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--spacing-xs);
}

.cyber-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.metric-change {
  font-size: 0.875rem;
  font-weight: 600;
}

.cyber-value.neon-text {
  text-shadow:
    0 0 5px var(--primary-color),
    0 0 10px var(--primary-color),
    0 0 15px var(--primary-color);
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
  position: relative; /* Added for glow positioning */
  overflow: hidden; /* Added for glow overflow */
}

.cyber-detail {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  position: relative; /* Added for glow positioning */
  overflow: hidden; /* Added for glow overflow */
}

.cyber-detail::before {
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

.cyber-detail:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.cyber-detail:hover::before {
  transform: scaleX(1);
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

.cyber-detail-label {
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

.cyber-detail-value {
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

.cyber-detail-date {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.cyber-detail-subtitle {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.market-trends {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  position: relative; /* Added for glow positioning */
  overflow: hidden; /* Added for glow overflow */
}

.cyber-trend {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  position: relative; /* Added for glow positioning */
  overflow: hidden; /* Added for glow overflow */
}

.cyber-trend::before {
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

.cyber-trend:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.cyber-trend:hover::before {
  transform: scaleX(1);
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

.cyber-trend-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.trend-indicator {
  font-size: 1.25rem;
  font-weight: 600;
}

.cyber-indicator {
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

.cyber-bar {
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

.cyber-bar .trend-fill {
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

.cyber-bar .trend-fill.neutral {
  background: var(--text-muted);
}

.trend-value {
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
}

.cyber-trend-value {
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

.cyber-trend-value.positive {
  color: #10b981;
}

.cyber-trend-value.negative {
  color: #ef4444;
}

.cyber-trend-value.neutral {
  color: var(--text-secondary);
}

.error-section {
  text-align: center;
  padding: var(--spacing-2xl);
  position: relative; /* Added for glow positioning */
  overflow: hidden; /* Added for glow overflow */
}

.cyber-error {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  position: relative; /* Added for glow positioning */
  overflow: hidden; /* Added for glow overflow */
}

.cyber-error::before {
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

.cyber-error:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.cyber-error:hover::before {
  transform: scaleX(1);
}

.error-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
}

.cyber-error-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
}

.error-section h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.cyber-error-title {
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.error-section p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
}

.cyber-error-text {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
}

.error-button {
  background-color: var(--primary-color);
  color: white;
  padding: 8px 15px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
  position: relative; /* Added for glow positioning */
}

.cyber-error-button {
  background-color: var(--primary-color);
  color: white;
  padding: 8px 15px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
  position: relative; /* Added for glow positioning */
}

.error-button:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

.cyber-error-button:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

.error-button .button-glow {
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

.cyber-error-button .button-glow {
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

.error-button:hover .button-glow {
  opacity: 1;
}

.cyber-error-button:hover .button-glow {
  opacity: 1;
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

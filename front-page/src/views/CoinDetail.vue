<template>
  <div class="coin-detail-page">
    <!-- 背景動畫效果 -->
    <div class="cyberpunk-bg">
      <div class="grid-overlay"></div>
      <div class="scan-lines"></div>
      <div class="glitch-overlay"></div>
    </div>
    
    <NavbarItem />

    <!-- 載入狀態 -->
    <div v-if="loading" class="loading-section">
      <div class="cyberpunk-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      <p class="loading-text">載入幣種資料中...</p>
    </div>

    <!-- 幣種詳情 -->
    <div v-else-if="coinData" class="container">
      <!-- 幣種標題區域 -->
      <div class="coin-header cyber-panel">
        <div class="card-glow"></div>
        <div class="card-crack"></div>
        <div class="coin-info">
          <div class="coin-icon neon-icon">
            <img v-if="coinData.logo" :src="coinData.logo" :alt="coinData.name" class="coin-logo" />
            <div v-else class="coin-placeholder">{{ getCoinIcon(coinData.symbol) }}</div>
          </div>
          <div class="coin-details">
            <h1 class="coin-name cyber-title">
              <span class="glitch-text" :data-text="coinData.name">{{ coinData.name }}</span>
              <span class="japanese-text">詳細</span>
            </h1>
            <p class="coin-symbol cyber-symbol">{{ coinData.symbol.toUpperCase() }}</p>
            <div class="coin-rank cyber-rank" v-if="coinData.rank">
              <span class="rank-label">排名</span>
              <span class="rank-value">#{{ coinData.rank }}</span>
            </div>
          </div>
        </div>

        <div class="coin-status">
          <div class="status-badge cyber-badge" :class="{ active: coinData.is_active }">
            {{ coinData.is_active ? '活躍' : '非活躍' }}
          </div>
          <div class="status-badge cyber-badge" :class="{ new: coinData.is_new }" v-if="coinData.is_new">
            新幣種
          </div>
        </div>
      </div>

      <!-- 主要資訊卡片 -->
      <div class="info-grid">
        <div class="info-card cyber-panel">
          <div class="card-glow"></div>
          <div class="card-crack"></div>
          <h3 class="cyber-card-title">基本資訊</h3>
          <div class="info-list">
            <div class="info-item cyber-item">
              <span class="info-label cyber-label">類型</span>
              <span class="info-value cyber-value">{{ coinData.type || 'N/A' }}</span>
            </div>
            <div class="info-item cyber-item">
              <span class="info-label cyber-label">開發狀態</span>
              <span class="info-value cyber-value">{{ coinData.development_status || 'N/A' }}</span>
            </div>
            <div class="info-item cyber-item">
              <span class="info-label cyber-label">硬體錢包</span>
              <span class="info-value cyber-value">{{ coinData.hardware_wallet ? '支援' : '不支援' }}</span>
            </div>
            <div class="info-item cyber-item">
              <span class="info-label cyber-label">證明類型</span>
              <span class="info-value cyber-value">{{ coinData.proof_type || 'N/A' }}</span>
            </div>
            <div class="info-item cyber-item">
              <span class="info-label cyber-label">雜湊演算法</span>
              <span class="info-value cyber-value">{{ coinData.hash_algorithm || 'N/A' }}</span>
            </div>
            <div class="info-item cyber-item">
              <span class="info-label cyber-label">組織結構</span>
              <span class="info-value cyber-value">{{ coinData.org_structure || 'N/A' }}</span>
            </div>
            <div class="info-item cyber-item">
              <span class="info-label cyber-label">開始時間</span>
              <span class="info-value cyber-value">{{ formatDate(coinData.started_at) }}</span>
            </div>
          </div>
        </div>

        <!-- 標籤卡片 -->
        <div class="info-card cyber-panel" v-if="coinData.tags && coinData.tags.length">
          <div class="card-glow"></div>
          <div class="card-crack"></div>
          <h3 class="cyber-card-title">標籤</h3>
          <div class="tags-container">
            <span v-for="tag in coinData.tags" :key="tag.id" class="tag cyber-tag">
              {{ tag.name }}
            </span>
          </div>
        </div>

        <!-- 團隊卡片 -->
        <div class="info-card cyber-panel" v-if="coinData.team && coinData.team.length">
          <div class="card-glow"></div>
          <div class="card-crack"></div>
          <h3 class="cyber-card-title">團隊</h3>
          <div class="team-list">
            <div v-for="member in coinData.team" :key="member.id" class="team-member cyber-member">
              <div class="member-info">
                <span class="member-name cyber-name">{{ member.name }}</span>
                <span class="member-position cyber-position">{{ member.position }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 連結卡片 -->
        <div class="info-card cyber-panel" v-if="coinData.links">
          <div class="card-glow"></div>
          <div class="card-crack"></div>
          <h3 class="cyber-card-title">相關連結</h3>
          <div class="links-container">
            <div v-for="(link, type) in coinData.links" :key="type" class="link-group">
              <h4 class="link-type cyber-link-type">{{ formatLinkType(String(type)) }}</h4>
              <div class="link-list">
                <a
                  v-for="url in link"
                  :key="url"
                  :href="url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="link-item cyber-link"
                >
                  <span class="link-icon neon-icon">{{ getLinkIcon(String(type)) }}</span>
                  <span class="link-text cyber-link-text">{{ getDomainFromUrl(url) }}</span>
                  <span class="link-arrow">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 白皮書卡片 -->
        <div class="info-card cyber-panel" v-if="coinData.whitepaper && coinData.whitepaper.link">
          <div class="card-glow"></div>
          <div class="card-crack"></div>
          <h3 class="cyber-card-title">白皮書</h3>
          <a
            :href="coinData.whitepaper.link"
            target="_blank"
            rel="noopener noreferrer"
            class="whitepaper-link cyber-link"
          >
            <div class="whitepaper-content cyber-content">
              <img
                v-if="coinData.whitepaper.thumbnail"
                :src="coinData.whitepaper.thumbnail"
                alt="白皮書縮圖"
                class="whitepaper-thumbnail"
              />
              <div class="whitepaper-info">
                <span class="whitepaper-text cyber-text">查看白皮書</span>
                <span class="whitepaper-arrow">↗</span>
              </div>
            </div>
          </a>
        </div>
      </div>

      <!-- 描述卡片 -->
      <div class="description-card cyber-panel" v-if="coinData.description">
        <div class="card-glow"></div>
        <div class="card-crack"></div>
        <h3 class="cyber-card-title">專案描述</h3>
        <p class="description-text cyber-text">{{ coinData.description }}</p>
      </div>
    </div>

    <!-- 錯誤狀態 -->
    <div v-else class="error-section cyber-error">
      <div class="error-icon cyber-error-icon">⚠️</div>
      <h3 class="cyber-error-title">載入失敗</h3>
      <p class="cyber-error-text">無法載入幣種資料，請稍後再試</p>
      <button @click="fetchCoinData" class="cyber-button error-button">
        <span class="button-text">重新載入</span>
        <div class="button-glow"></div>
      </button>
    </div>
    <AppFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import NavbarItem from '../components/Navbar.vue'
import AppFooter from '../components/Footer.vue'

interface CoinData {
  id: string
  name: string
  symbol: string
  rank?: number
  type?: string
  is_new?: boolean
  is_active?: boolean
  started_at?: string
  development_status?: string
  hardware_wallet?: boolean
  proof_type?: string
  org_structure?: string
  hash_algorithm?: string
  logo?: string
  description?: string
  tags?: Array<{ id: string; name: string }>
  team?: Array<{ id: string; name: string; position: string }>
  links?: { [key: string]: string[] }
  whitepaper?: { link: string; thumbnail?: string }
}

export default defineComponent({
  name: 'CoinDetail',
  components: {
    NavbarItem,
    AppFooter
  },
  setup() {
    const route = useRoute()
    const coinData = ref<CoinData | null>(null)
    const loading = ref(true)

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

    // 格式化日期
    const formatDate = (dateString: string | undefined) => {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString('zh-TW')
    }

    // 格式化連結類型
    const formatLinkType = (type: string) => {
      const typeMap: { [key: string]: string } = {
        website: '官方網站',
        twitter: 'Twitter',
        reddit: 'Reddit',
        source_code: '原始碼',
        technical_doc: '技術文件',
        explorer: '區塊鏈瀏覽器',
        message_board: '討論區'
      }
      return typeMap[type] || type
    }

    // 取得連結圖示
    const getLinkIcon = (type: string) => {
      const icons: { [key: string]: string } = {
        website: '🌐',
        twitter: '🐦',
        reddit: '🤖',
        source_code: '💻',
        technical_doc: '📄',
        explorer: '🔍',
        message_board: '💬'
      }
      return icons[type] || '🔗'
    }

    // 從URL取得域名
    const getDomainFromUrl = (url: string | number) => {
      try {
        const urlString = String(url)
        const domain = new URL(urlString).hostname.replace('www.', '')
        return domain
      } catch {
        return String(url)
      }
    }

    // 載入幣種資料
    const fetchCoinData = async () => {
      try {
        loading.value = true
        const response = await fetch(`https://api.coinpaprika.com/v1/coins/${route.params.id}`)
        if (!response.ok) throw new Error('Network response was not ok')

        const data = await response.json()
        coinData.value = data
      } catch (error) {
        console.error('Error fetching coin data:', error)
        coinData.value = null
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchCoinData()
    })

    return {
      coinData,
      loading,
      getCoinIcon,
      formatDate,
      formatLinkType,
      getLinkIcon,
      getDomainFromUrl,
      fetchCoinData
    }
  }
})
</script>

<style scoped>
.coin-detail-page {
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

.coin-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-xl);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
}

.cyber-panel {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
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

.cyber-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
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

.cyber-panel:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.cyber-panel:hover .card-glow {
  opacity: 1;
}

.cyber-panel:hover::before {
  transform: scaleX(1);
}

.coin-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.coin-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 0, 110, 0.1);
  border-radius: var(--radius-lg);
  flex-shrink: 0;
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

.coin-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: var(--radius-lg);
}

.coin-placeholder {
  font-size: 2.5rem;
}

.coin-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.cyber-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.glitch-text {
  color: transparent;
  white-space: pre;
  font-size: 2rem;
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

.japanese-text {
  font-size: 1rem;
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

.cyber-symbol {
  font-size: 1.1rem;
  color: var(--text-muted);
  font-weight: 500;
}

.cyber-rank {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.rank-label {
  font-size: 0.875rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.rank-value {
  background: linear-gradient(135deg, #ff006e, #8338ec);
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 0 5px rgba(255, 0, 110, 0.3);
}

.coin-status {
  display: flex;
  gap: var(--spacing-sm);
}

.cyber-badge {
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cyber-badge.active {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.2);
  text-shadow: 0 0 5px rgba(16, 185, 129, 0.3);
}

.cyber-badge.new {
  background: rgba(255, 0, 110, 0.1);
  color: #ff006e;
  border: 1px solid rgba(255, 0, 110, 0.2);
  text-shadow: 0 0 5px rgba(255, 0, 110, 0.3);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.cyber-card-title {
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: var(--spacing-md);
  text-shadow: 0 0 5px rgba(255, 0, 110, 0.3);
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.cyber-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.cyber-item:last-child {
  border-bottom: none;
}

.cyber-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cyber-value {
  color: var(--text-primary);
  font-weight: 500;
  text-shadow: 0 0 5px rgba(255, 0, 110, 0.3);
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.cyber-tag {
  background: linear-gradient(135deg, rgba(255, 0, 110, 0.1), rgba(131, 56, 236, 0.1));
  color: #ff006e;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(255, 0, 110, 0.2);
  text-shadow: 0 0 5px rgba(255, 0, 110, 0.3);
}

.team-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.cyber-member {
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.member-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.cyber-name {
  color: var(--text-primary);
  font-weight: 600;
  text-shadow: 0 0 5px rgba(255, 0, 110, 0.3);
}

.cyber-position {
  color: var(--text-muted);
  font-size: 0.875rem;
}

.links-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.cyber-link-type {
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--spacing-sm);
}

.link-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.cyber-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.cyber-link:hover {
  background: var(--bg-tertiary);
  transform: translateX(4px);
  box-shadow: 0 0 10px rgba(255, 0, 110, 0.2);
}

.cyber-link-text {
  flex: 1;
  font-size: 0.875rem;
}

.link-arrow {
  color: var(--text-muted);
  font-size: 0.875rem;
  transition: transform 0.3s ease;
}

.cyber-link:hover .link-arrow {
  transform: translateX(2px);
}

.cyber-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.cyber-content:hover {
  background: var(--bg-tertiary);
  transform: translateY(-2px);
  box-shadow: 0 0 10px rgba(255, 0, 110, 0.2);
}

.whitepaper-thumbnail {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

.whitepaper-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.cyber-text {
  color: var(--text-primary);
  font-weight: 500;
  text-shadow: 0 0 5px rgba(255, 0, 110, 0.3);
}

.whitepaper-arrow {
  color: #ff006e;
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.cyber-content:hover .whitepaper-arrow {
  transform: translateX(4px);
}

.description-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  position: relative;
  overflow: hidden;
}

.description-text {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 1rem;
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
  margin-bottom: var(--spacing-lg);
}

.cyber-button {
  background: linear-gradient(135deg, #ff006e, #8338ec);
  color: white;
  padding: 8px 15px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
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

@media (max-width: 768px) {
  .coin-header {
    flex-direction: column;
    gap: var(--spacing-lg);
    align-items: flex-start;
  }

  .coin-info {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-md);
  }

  .cyber-title {
    font-size: 1.5rem;
    align-items: center;
  }

  .glitch-text {
    font-size: 1.5rem;
  }

  .japanese-text {
    font-size: 0.8rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .cyber-panel {
    padding: var(--spacing-lg);
  }

  .coin-icon {
    width: 60px;
    height: 60px;
  }

  .coin-placeholder {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .cyber-title {
    font-size: 1.2rem;
  }

  .glitch-text {
    font-size: 1.2rem;
  }

  .japanese-text {
    font-size: 0.7rem;
  }

  .cyber-panel {
    padding: var(--spacing-md);
  }

  .coin-icon {
    width: 50px;
    height: 50px;
  }

  .coin-placeholder {
    font-size: 1.5rem;
  }
}
</style>

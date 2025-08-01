<template>
  <div class="coin-detail-page">
    <NavbarItem />

    <!-- 載入狀態 -->
    <div v-if="loading" class="loading-section">
      <div class="loading-spinner"></div>
      <p>載入幣種資料中...</p>
    </div>

    <!-- 幣種詳情 -->
    <div v-else-if="coinData" class="container">
      <!-- 幣種標題區域 -->
      <div class="coin-header">
        <div class="coin-info">
          <div class="coin-icon">
            <img v-if="coinData.logo" :src="coinData.logo" :alt="coinData.name" class="coin-logo" />
            <div v-else class="coin-placeholder">{{ getCoinIcon(coinData.symbol) }}</div>
          </div>
          <div class="coin-details">
            <h1 class="coin-name">{{ coinData.name }}</h1>
            <p class="coin-symbol">{{ coinData.symbol.toUpperCase() }}</p>
            <div class="coin-rank" v-if="coinData.rank">
              <span class="rank-label">排名</span>
              <span class="rank-value">#{{ coinData.rank }}</span>
            </div>
          </div>
        </div>

        <div class="coin-status">
          <div class="status-badge" :class="{ active: coinData.is_active }">
            {{ coinData.is_active ? '活躍' : '非活躍' }}
          </div>
          <div class="status-badge" :class="{ new: coinData.is_new }" v-if="coinData.is_new">
            新幣種
          </div>
        </div>
      </div>

      <!-- 主要資訊卡片 -->
      <div class="info-grid">
        <div class="info-card">
          <h3>基本資訊</h3>
          <div class="info-list">
            <div class="info-item">
              <span class="info-label">類型</span>
              <span class="info-value">{{ coinData.type || 'N/A' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">開發狀態</span>
              <span class="info-value">{{ coinData.development_status || 'N/A' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">硬體錢包</span>
              <span class="info-value">{{ coinData.hardware_wallet ? '支援' : '不支援' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">證明類型</span>
              <span class="info-value">{{ coinData.proof_type || 'N/A' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">雜湊演算法</span>
              <span class="info-value">{{ coinData.hash_algorithm || 'N/A' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">組織結構</span>
              <span class="info-value">{{ coinData.org_structure || 'N/A' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">開始時間</span>
              <span class="info-value">{{ formatDate(coinData.started_at) }}</span>
            </div>
          </div>
        </div>

        <!-- 標籤卡片 -->
        <div class="info-card" v-if="coinData.tags && coinData.tags.length">
          <h3>標籤</h3>
          <div class="tags-container">
            <span v-for="tag in coinData.tags" :key="tag.id" class="tag">
              {{ tag.name }}
            </span>
          </div>
        </div>

        <!-- 團隊卡片 -->
        <div class="info-card" v-if="coinData.team && coinData.team.length">
          <h3>團隊</h3>
          <div class="team-list">
            <div v-for="member in coinData.team" :key="member.id" class="team-member">
              <div class="member-info">
                <span class="member-name">{{ member.name }}</span>
                <span class="member-position">{{ member.position }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 連結卡片 -->
        <div class="info-card" v-if="coinData.links">
          <h3>相關連結</h3>
          <div class="links-container">
            <div v-for="(link, type) in coinData.links" :key="type" class="link-group">
              <h4 class="link-type">{{ formatLinkType(String(type)) }}</h4>
              <div class="link-list">
                <a
                  v-for="url in link"
                  :key="url"
                  :href="url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="link-item"
                >
                  <span class="link-icon">{{ getLinkIcon(String(type)) }}</span>
                  <span class="link-text">{{ getDomainFromUrl(url) }}</span>
                  <span class="link-arrow">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 白皮書卡片 -->
        <div class="info-card" v-if="coinData.whitepaper && coinData.whitepaper.link">
          <h3>白皮書</h3>
          <a
            :href="coinData.whitepaper.link"
            target="_blank"
            rel="noopener noreferrer"
            class="whitepaper-link"
          >
            <div class="whitepaper-content">
              <img
                v-if="coinData.whitepaper.thumbnail"
                :src="coinData.whitepaper.thumbnail"
                alt="白皮書縮圖"
                class="whitepaper-thumbnail"
              />
              <div class="whitepaper-info">
                <span class="whitepaper-text">查看白皮書</span>
                <span class="whitepaper-arrow">↗</span>
              </div>
            </div>
          </a>
        </div>
      </div>

      <!-- 描述卡片 -->
      <div class="description-card" v-if="coinData.description">
        <h3>專案描述</h3>
        <p class="description-text">{{ coinData.description }}</p>
      </div>
    </div>

    <!-- 錯誤狀態 -->
    <div v-else class="error-section">
      <div class="error-icon">⚠️</div>
      <h3>載入失敗</h3>
      <p>無法載入幣種資料，請稍後再試</p>
      <button @click="fetchCoinData" class="btn btn-primary">重新載入</button>
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
}

.loading-section {
  text-align: center;
  padding: var(--spacing-2xl);
}

.loading-section p {
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
  background: rgba(99, 102, 241, 0.1);
  border-radius: var(--radius-lg);
  flex-shrink: 0;
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

.coin-name {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.coin-symbol {
  font-size: 1.1rem;
  color: var(--text-muted);
  font-weight: 500;
}

.coin-rank {
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
  background: var(--primary-color);
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
}

.coin-status {
  display: flex;
  gap: var(--spacing-sm);
}

.status-badge {
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.active {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.status-badge.new {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary-color);
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.info-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
}

.info-card h3 {
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: var(--spacing-md);
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  color: var(--text-primary);
  font-weight: 500;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.tag {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary-color);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.team-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.team-member {
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

.member-name {
  color: var(--text-primary);
  font-weight: 600;
}

.member-position {
  color: var(--text-muted);
  font-size: 0.875rem;
}

.links-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.link-group h4 {
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

.link-item {
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

.link-item:hover {
  background: var(--bg-tertiary);
  transform: translateX(4px);
}

.link-icon {
  font-size: 1.1rem;
}

.link-text {
  flex: 1;
  font-size: 0.875rem;
}

.link-arrow {
  color: var(--text-muted);
  font-size: 0.875rem;
  transition: transform 0.3s ease;
}

.link-item:hover .link-arrow {
  transform: translateX(2px);
}

.whitepaper-link {
  text-decoration: none;
  color: inherit;
}

.whitepaper-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.whitepaper-content:hover {
  background: var(--bg-tertiary);
  transform: translateY(-2px);
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

.whitepaper-text {
  color: var(--text-primary);
  font-weight: 500;
}

.whitepaper-arrow {
  color: var(--primary-color);
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.whitepaper-content:hover .whitepaper-arrow {
  transform: translateX(4px);
}

.description-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
}

.description-card h3 {
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: var(--spacing-md);
}

.description-text {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 1rem;
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

  .coin-name {
    font-size: 1.5rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .info-card {
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
</style>

<template>
  <div class="live-btc-price">
    <div class="price-header">
      <div class="btc-icon">₿</div>
      <div class="price-info">
        <h3 class="symbol">{{ t('market.bitcoin') }}</h3>
        <p class="subtitle">{{ t('market.livePrice') }}</p>
      </div>
      <div class="connection-status" :class="{ connected: isConnected }">
        <span class="status-dot"></span>
        <span class="status-text">{{
          isConnected ? t('market.connected') : t('market.connecting')
        }}</span>
      </div>
    </div>

    <div class="price-content">
      <div class="current-price">
        <span class="price-label">{{ t('market.currentPrice') }}</span>
        <span class="price-value">${{ formatPrice(btcPrice?.price) }}</span>
      </div>

      <div class="price-details">
        <div class="detail-item">
          <span class="detail-label">{{ t('market.change24h') }}</span>
          <span class="detail-value" :class="getChangeClass(btcPrice?.change24h)">
            {{ formatChange(btcPrice?.change24h) }}
          </span>
        </div>

        <div class="detail-item">
          <span class="detail-label">{{ t('market.volume24h') }}</span>
          <span class="detail-value">{{ formatVolume(btcPrice?.volume24h) }}</span>
        </div>

        <div class="detail-item">
          <span class="detail-label">{{ t('market.marketCap') }}</span>
          <span class="detail-value">${{ formatNumber(btcPrice?.marketCap) }}</span>
        </div>
      </div>

      <div class="last-updated">
        <span class="update-text">{{ t('market.lastUpdated') }}:</span>
        <span class="update-time">{{ formatTime(btcPrice?.lastUpdated) }}</span>
      </div>
    </div>

    <!-- 價格變化動畫 -->
    <div
      v-if="priceChange"
      class="price-change-indicator"
      :class="getChangeClass(btcPrice?.change24h)"
    >
      <span class="change-arrow">{{ (btcPrice?.change24h || 0) > 0 ? '↗' : '↘' }}</span>
      <span class="change-text">{{ formatChange(btcPrice?.change24h) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { btcWebSocketService, type BTCPrice } from '../services/websocket'

export default defineComponent({
  name: 'LiveBTCPrice',
  setup() {
    const { t } = useI18n()
    const btcPrice = ref<BTCPrice | null>(null)
    const isConnected = ref(false)
    const priceChange = ref(false)
    let unsubscribe: (() => void) | null = null

    // 格式化價格
    const formatPrice = (price: number | undefined) => {
      if (!price) return '0.00'
      return price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    }

    // 格式化變化百分比
    const formatChange = (change: number | undefined) => {
      if (!change) return '0.00%'
      return `${change > 0 ? '+' : ''}${change.toFixed(2)}%`
    }

    // 格式化交易量
    const formatVolume = (volume: number | undefined) => {
      if (!volume) return '0'
      if (volume >= 1e9) return `${(volume / 1e9).toFixed(2)}B`
      if (volume >= 1e6) return `${(volume / 1e6).toFixed(2)}M`
      if (volume >= 1e3) return `${(volume / 1e3).toFixed(2)}K`
      return volume.toLocaleString()
    }

    // 格式化數字
    const formatNumber = (num: number | undefined) => {
      if (!num) return '0'
      if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`
      if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
      if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
      return num.toLocaleString()
    }

    // 格式化時間
    const formatTime = (date: Date | undefined) => {
      if (!date) return '--'
      return date.toLocaleTimeString('zh-TW', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    // 取得變化樣式類別
    const getChangeClass = (change: number | undefined) => {
      if (!change) return 'neutral'
      return change > 0 ? 'positive' : 'negative'
    }

    // 處理價格更新
    const handlePriceUpdate = (data: BTCPrice) => {
      // 檢查是否有價格變化
      if (btcPrice.value && btcPrice.value.price !== data.price) {
        priceChange.value = true
        setTimeout(() => {
          priceChange.value = false
        }, 2000)
      }

      btcPrice.value = data
      isConnected.value = btcWebSocketService.getConnectionStatus()
    }

    onMounted(() => {
      // 訂閱WebSocket更新
      unsubscribe = btcWebSocketService.subscribe(handlePriceUpdate)

      // 初始化連接狀態
      isConnected.value = btcWebSocketService.getConnectionStatus()
    })

    onUnmounted(() => {
      // 取消訂閱
      if (unsubscribe) {
        unsubscribe()
      }
    })

    return {
      t,
      btcPrice,
      isConnected,
      priceChange,
      formatPrice,
      formatChange,
      formatVolume,
      formatNumber,
      formatTime,
      getChangeClass
    }
  }
})
</script>

<style scoped>
.live-btc-price {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  position: relative;
  overflow: hidden;
}

.live-btc-price::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
}

.price-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.btc-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
  background: rgba(99, 102, 241, 0.1);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
}

.price-info {
  flex: 1;
}

.symbol {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-xs) 0;
}

.subtitle {
  color: var(--text-muted);
  font-size: 0.875rem;
  margin: 0;
}

.connection-status {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
}

.connection-status.connected {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.2);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-muted);
  animation: pulse 2s infinite;
}

.connection-status.connected .status-dot {
  background: #10b981;
}

.status-text {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.price-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.current-price {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.price-label {
  font-size: 0.875rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.price-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  font-family: var(--font-mono);
}

.price-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-md);
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.detail-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  font-family: var(--font-mono);
}

.detail-value.positive {
  color: #10b981;
}

.detail-value.negative {
  color: #ef4444;
}

.detail-value.neutral {
  color: var(--text-secondary);
}

.last-updated {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
  border-top: 1px solid var(--border-color);
}

.update-text {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.update-time {
  font-size: 0.875rem;
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-weight: 500;
}

.price-change-indicator {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  animation: slideIn 0.3s ease-out;
}

.price-change-indicator.positive {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.price-change-indicator.negative {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.change-arrow {
  font-size: 1rem;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .live-btc-price {
    padding: var(--spacing-lg);
  }

  .price-header {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-sm);
  }

  .btc-icon {
    width: 50px;
    height: 50px;
    font-size: 2rem;
  }

  .price-value {
    font-size: 2rem;
  }

  .price-details {
    grid-template-columns: 1fr;
  }

  .price-change-indicator {
    position: static;
    margin-top: var(--spacing-md);
    justify-content: center;
  }
}
</style>

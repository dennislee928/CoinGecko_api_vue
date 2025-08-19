import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { btcWebSocketService } from '../services/websocket';
export default defineComponent({
    name: 'LiveBTCPrice',
    setup() {
        const { t } = useI18n();
        const btcPrice = ref(null);
        const isConnected = ref(false);
        const priceChange = ref(false);
        let unsubscribe = null;
        // 格式化價格
        const formatPrice = (price) => {
            if (!price)
                return '0.00';
            return price.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        };
        // 格式化變化百分比
        const formatChange = (change) => {
            if (!change)
                return '0.00%';
            return `${change > 0 ? '+' : ''}${change.toFixed(2)}%`;
        };
        // 格式化交易量
        const formatVolume = (volume) => {
            if (!volume)
                return '0';
            if (volume >= 1e9)
                return `${(volume / 1e9).toFixed(2)}B`;
            if (volume >= 1e6)
                return `${(volume / 1e6).toFixed(2)}M`;
            if (volume >= 1e3)
                return `${(volume / 1e3).toFixed(2)}K`;
            return volume.toLocaleString();
        };
        // 格式化數字
        const formatNumber = (num) => {
            if (!num)
                return '0';
            if (num >= 1e12)
                return `${(num / 1e12).toFixed(2)}T`;
            if (num >= 1e9)
                return `${(num / 1e9).toFixed(2)}B`;
            if (num >= 1e6)
                return `${(num / 1e6).toFixed(2)}M`;
            return num.toLocaleString();
        };
        // 格式化時間
        const formatTime = (date) => {
            if (!date)
                return '--';
            return date.toLocaleTimeString('zh-TW', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        };
        // 取得變化樣式類別
        const getChangeClass = (change) => {
            if (!change)
                return 'neutral';
            return change > 0 ? 'positive' : 'negative';
        };
        // 處理價格更新
        const handlePriceUpdate = (data) => {
            // 檢查是否有價格變化
            if (btcPrice.value && btcPrice.value.price !== data.price) {
                priceChange.value = true;
                setTimeout(() => {
                    priceChange.value = false;
                }, 2000);
            }
            btcPrice.value = data;
            isConnected.value = btcWebSocketService.getConnectionStatus();
        };
        onMounted(() => {
            // 訂閱WebSocket更新
            unsubscribe = btcWebSocketService.subscribe(handlePriceUpdate);
            // 初始化連接狀態
            isConnected.value = btcWebSocketService.getConnectionStatus();
        });
        onUnmounted(() => {
            // 取消訂閱
            if (unsubscribe) {
                unsubscribe();
            }
        });
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
        };
    }
});
const __VLS_ctxBase = {};
const __VLS_ctx = __VLS_ctxBase;
const __VLS_localComponents = {
    ...{},
    ...{},
    ...__VLS_ctxBase,
};
let __VLS_components;
let __VLS_styleScopedClasses;
__VLS_styleScopedClasses['live-btc-price'];
__VLS_styleScopedClasses['connection-status'];
__VLS_styleScopedClasses['connection-status'];
__VLS_styleScopedClasses['connected'];
__VLS_styleScopedClasses['status-dot'];
__VLS_styleScopedClasses['detail-value'];
__VLS_styleScopedClasses['detail-value'];
__VLS_styleScopedClasses['detail-value'];
__VLS_styleScopedClasses['price-change-indicator'];
__VLS_styleScopedClasses['positive'];
__VLS_styleScopedClasses['price-change-indicator'];
__VLS_styleScopedClasses['negative'];
__VLS_styleScopedClasses['live-btc-price'];
__VLS_styleScopedClasses['price-header'];
__VLS_styleScopedClasses['btc-icon'];
__VLS_styleScopedClasses['price-value'];
__VLS_styleScopedClasses['price-details'];
__VLS_styleScopedClasses['price-change-indicator'];
// CSS variable injection 
// CSS variable injection end 
let __VLS_resolvedLocalAndGlobalComponents;
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("live-btc-price") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("price-header") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("btc-icon") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("price-info") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("symbol") }, });
(__VLS_ctx.t('market.bitcoin'));
__VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("subtitle") }, });
(__VLS_ctx.t('market.livePrice'));
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("connection-status") }, ...{ class: (({ connected: __VLS_ctx.isConnected })) }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("status-dot") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("status-text") }, });
(__VLS_ctx.isConnected ? __VLS_ctx.t('market.connected') : __VLS_ctx.t('market.connecting'));
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("price-content") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("current-price") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("price-label") }, });
(__VLS_ctx.t('market.currentPrice'));
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("price-value") }, });
(__VLS_ctx.formatPrice(__VLS_ctx.btcPrice?.price));
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("price-details") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("detail-item") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("detail-label") }, });
(__VLS_ctx.t('market.change24h'));
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("detail-value") }, ...{ class: ((__VLS_ctx.getChangeClass(__VLS_ctx.btcPrice?.change24h))) }, });
(__VLS_ctx.formatChange(__VLS_ctx.btcPrice?.change24h));
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("detail-item") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("detail-label") }, });
(__VLS_ctx.t('market.volume24h'));
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("detail-value") }, });
(__VLS_ctx.formatVolume(__VLS_ctx.btcPrice?.volume24h));
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("detail-item") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("detail-label") }, });
(__VLS_ctx.t('market.marketCap'));
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("detail-value") }, });
(__VLS_ctx.formatNumber(__VLS_ctx.btcPrice?.marketCap));
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("last-updated") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("update-text") }, });
(__VLS_ctx.t('market.lastUpdated'));
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("update-time") }, });
(__VLS_ctx.formatTime(__VLS_ctx.btcPrice?.lastUpdated));
if (__VLS_ctx.priceChange) {
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("price-change-indicator") }, ...{ class: ((__VLS_ctx.getChangeClass(__VLS_ctx.btcPrice?.change24h))) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("change-arrow") }, });
    ((__VLS_ctx.btcPrice?.change24h || 0) > 0 ? '↗' : '↘');
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("change-text") }, });
    (__VLS_ctx.formatChange(__VLS_ctx.btcPrice?.change24h));
}
__VLS_styleScopedClasses['live-btc-price'];
__VLS_styleScopedClasses['price-header'];
__VLS_styleScopedClasses['btc-icon'];
__VLS_styleScopedClasses['price-info'];
__VLS_styleScopedClasses['symbol'];
__VLS_styleScopedClasses['subtitle'];
__VLS_styleScopedClasses['connection-status'];
__VLS_styleScopedClasses['connected'];
__VLS_styleScopedClasses['status-dot'];
__VLS_styleScopedClasses['status-text'];
__VLS_styleScopedClasses['price-content'];
__VLS_styleScopedClasses['current-price'];
__VLS_styleScopedClasses['price-label'];
__VLS_styleScopedClasses['price-value'];
__VLS_styleScopedClasses['price-details'];
__VLS_styleScopedClasses['detail-item'];
__VLS_styleScopedClasses['detail-label'];
__VLS_styleScopedClasses['detail-value'];
__VLS_styleScopedClasses['detail-item'];
__VLS_styleScopedClasses['detail-label'];
__VLS_styleScopedClasses['detail-value'];
__VLS_styleScopedClasses['detail-item'];
__VLS_styleScopedClasses['detail-label'];
__VLS_styleScopedClasses['detail-value'];
__VLS_styleScopedClasses['last-updated'];
__VLS_styleScopedClasses['update-text'];
__VLS_styleScopedClasses['update-time'];
__VLS_styleScopedClasses['price-change-indicator'];
__VLS_styleScopedClasses['change-arrow'];
__VLS_styleScopedClasses['change-text'];
var __VLS_slots;
var __VLS_inheritedAttrs;
const __VLS_refs = {};
const __VLS_templateResult = { slots: __VLS_slots,
    refs: $refs,
    attrs: {},
};
let __VLS_internalComponent;
//# sourceMappingURL=LiveBTCPrice.vue.js.map
import { defineComponent, ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import NavbarItem from '../components/Navbar.vue';
import LiveBTCPrice from '../components/LiveBTCPrice.vue';
export default defineComponent({
    name: 'MarketOverview',
    components: {
        NavbarItem,
        LiveBTCPrice
    },
    setup() {
        const { t } = useI18n();
        const marketData = ref(null);
        const loading = ref(true);
        // 格式化數字
        const formatNumber = (num) => {
            if (num >= 1e12)
                return (num / 1e12).toFixed(2) + 'T';
            if (num >= 1e9)
                return (num / 1e9).toFixed(2) + 'B';
            if (num >= 1e6)
                return (num / 1e6).toFixed(2) + 'M';
            if (num >= 1e3)
                return (num / 1e3).toFixed(2) + 'K';
            return num.toLocaleString();
        };
        // 格式化變化百分比
        const formatChange = (change) => {
            if (!change)
                return '0.00%';
            return `${change > 0 ? '+' : ''}${change.toFixed(2)}%`;
        };
        // 格式化日期
        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString('zh-TW');
        };
        // 格式化日期時間
        const formatDateTime = (timestamp) => {
            return new Date(timestamp * 1000).toLocaleString('zh-TW');
        };
        // 取得變化樣式類別
        const getChangeClass = (change) => {
            if (!change)
                return 'neutral';
            return change > 0 ? 'positive' : 'negative';
        };
        // 取得趨勢樣式類別
        const getTrendClass = (change) => {
            if (!change)
                return 'neutral';
            return change > 0 ? 'positive' : 'negative';
        };
        // 載入市場數據
        const fetchMarketData = async () => {
            try {
                loading.value = true;
                const response = await fetch('https://api.coinpaprika.com/v1/global');
                if (!response.ok)
                    throw new Error('Network response was not ok');
                const data = await response.json();
                marketData.value = data;
            }
            catch (error) {
                console.error('Error fetching market data:', error);
                marketData.value = null;
            }
            finally {
                loading.value = false;
            }
        };
        onMounted(() => {
            fetchMarketData();
        });
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
        };
    }
});
const __VLS_ctxBase = {};
const __VLS_ctx = __VLS_ctxBase;
const __VLS_localComponents = {
    ...{
        NavbarItem,
        LiveBTCPrice
    },
    ...{},
    ...{},
    ...__VLS_ctxBase,
};
let __VLS_components;
let __VLS_styleScopedClasses;
__VLS_styleScopedClasses['loading-section'];
__VLS_styleScopedClasses['metric-card'];
__VLS_styleScopedClasses['metric-card'];
__VLS_styleScopedClasses['metric-card'];
__VLS_styleScopedClasses['metric-card'];
__VLS_styleScopedClasses['metric-change'];
__VLS_styleScopedClasses['metric-change'];
__VLS_styleScopedClasses['metric-change'];
__VLS_styleScopedClasses['details-header'];
__VLS_styleScopedClasses['details-header'];
__VLS_styleScopedClasses['btn'];
__VLS_styleScopedClasses['arrow'];
__VLS_styleScopedClasses['detail-card'];
__VLS_styleScopedClasses['market-trends'];
__VLS_styleScopedClasses['trend-header'];
__VLS_styleScopedClasses['trend-indicator'];
__VLS_styleScopedClasses['positive'];
__VLS_styleScopedClasses['trend-indicator'];
__VLS_styleScopedClasses['negative'];
__VLS_styleScopedClasses['trend-indicator'];
__VLS_styleScopedClasses['neutral'];
__VLS_styleScopedClasses['trend-fill'];
__VLS_styleScopedClasses['positive'];
__VLS_styleScopedClasses['trend-fill'];
__VLS_styleScopedClasses['negative'];
__VLS_styleScopedClasses['trend-fill'];
__VLS_styleScopedClasses['neutral'];
__VLS_styleScopedClasses['trend-value'];
__VLS_styleScopedClasses['positive'];
__VLS_styleScopedClasses['trend-value'];
__VLS_styleScopedClasses['negative'];
__VLS_styleScopedClasses['trend-value'];
__VLS_styleScopedClasses['neutral'];
__VLS_styleScopedClasses['error-section'];
__VLS_styleScopedClasses['error-section'];
__VLS_styleScopedClasses['page-title'];
__VLS_styleScopedClasses['key-metrics'];
__VLS_styleScopedClasses['details-header'];
__VLS_styleScopedClasses['details-grid'];
__VLS_styleScopedClasses['trends-grid'];
__VLS_styleScopedClasses['metric-card'];
__VLS_styleScopedClasses['metric-icon'];
__VLS_styleScopedClasses['metric-value'];
// CSS variable injection 
// CSS variable injection end 
let __VLS_resolvedLocalAndGlobalComponents;
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("market-page") }, });
const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.NavbarItem;
/** @type { [typeof __VLS_components.NavbarItem, ] } */
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("page-header") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("page-title") }, });
(__VLS_ctx.t('page.marketOverview'));
__VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("page-subtitle") }, });
(__VLS_ctx.t('page.marketOverviewSubtitle'));
if (__VLS_ctx.loading) {
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("loading-section") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("loading-spinner") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.t('market.loading'));
}
else if (__VLS_ctx.marketData) {
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("market-content") }, });
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.LiveBTCPrice;
    /** @type { [typeof __VLS_components.LiveBTCPrice, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
    const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("key-metrics") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("metric-card primary") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("metric-icon") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("metric-content") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("metric-label") }, });
    (__VLS_ctx.t('market.totalMarketCap'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("metric-value") }, });
    (__VLS_ctx.formatNumber(__VLS_ctx.marketData.market_cap_usd));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("metric-change") }, ...{ class: ((__VLS_ctx.getChangeClass(__VLS_ctx.marketData.market_cap_change_24h))) }, });
    (__VLS_ctx.formatChange(__VLS_ctx.marketData.market_cap_change_24h));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("metric-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("metric-icon") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("metric-content") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("metric-label") }, });
    (__VLS_ctx.t('market.volume24h'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("metric-value") }, });
    (__VLS_ctx.formatNumber(__VLS_ctx.marketData.volume_24h_usd));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("metric-change") }, ...{ class: ((__VLS_ctx.getChangeClass(__VLS_ctx.marketData.volume_24h_change_24h))) }, });
    (__VLS_ctx.formatChange(__VLS_ctx.marketData.volume_24h_change_24h));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("metric-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("metric-icon") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("metric-content") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("metric-label") }, });
    (__VLS_ctx.t('market.bitcoinDominance'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("metric-value") }, });
    (__VLS_ctx.marketData.bitcoin_dominance_percentage);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("metric-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("metric-icon") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("metric-content") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("metric-label") }, });
    (__VLS_ctx.t('market.activeCoins'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("metric-value") }, });
    (__VLS_ctx.formatNumber(__VLS_ctx.marketData.cryptocurrencies_number));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("market-details") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("details-header") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    (__VLS_ctx.t('market.marketDetails'));
    const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ to: ("/coins"), ...{ class: ("btn btn-primary") }, }));
    const __VLS_14 = __VLS_13({ to: ("/coins"), ...{ class: ("btn btn-primary") }, }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('market.viewCoinList'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("arrow") }, });
    __VLS_nonNullable(__VLS_17.slots).default;
    const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("details-grid") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("detail-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("detail-value") }, });
    (__VLS_ctx.formatNumber(__VLS_ctx.marketData.market_cap_ath_value));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("detail-date") }, });
    (__VLS_ctx.formatDate(__VLS_ctx.marketData.market_cap_ath_date));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("detail-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("detail-value") }, });
    (__VLS_ctx.formatNumber(__VLS_ctx.marketData.volume_24h_ath_value));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("detail-date") }, });
    (__VLS_ctx.formatDate(__VLS_ctx.marketData.volume_24h_ath_date));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("detail-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("detail-value") }, });
    (__VLS_ctx.marketData.market_cap_percent_from_ath);
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("detail-subtitle") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("detail-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("detail-value") }, });
    (__VLS_ctx.marketData.volume_24h_percent_from_ath);
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("detail-subtitle") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("detail-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("detail-value") }, });
    (__VLS_ctx.marketData.volume_24h_percent_to_ath);
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("detail-subtitle") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("detail-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("detail-value") }, });
    (__VLS_ctx.formatDateTime(__VLS_ctx.marketData.last_updated));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("market-trends") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("trends-grid") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("trend-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("trend-header") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("trend-indicator") }, ...{ class: ((__VLS_ctx.getTrendClass(__VLS_ctx.marketData.market_cap_change_24h))) }, });
    (__VLS_ctx.marketData.market_cap_change_24h > 0 ? '↗' : '↘');
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("trend-bar") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("trend-fill") }, ...{ class: ((__VLS_ctx.getTrendClass(__VLS_ctx.marketData.market_cap_change_24h))) }, ...{ style: (({ width: Math.abs(__VLS_ctx.marketData.market_cap_change_24h) + '%' })) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("trend-value") }, });
    (__VLS_ctx.formatChange(__VLS_ctx.marketData.market_cap_change_24h));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("trend-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("trend-header") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("trend-indicator") }, ...{ class: ((__VLS_ctx.getTrendClass(__VLS_ctx.marketData.volume_24h_change_24h))) }, });
    (__VLS_ctx.marketData.volume_24h_change_24h > 0 ? '↗' : '↘');
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("trend-bar") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("trend-fill") }, ...{ class: ((__VLS_ctx.getTrendClass(__VLS_ctx.marketData.volume_24h_change_24h))) }, ...{ style: (({ width: Math.abs(__VLS_ctx.marketData.volume_24h_change_24h) + '%' })) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("trend-value") }, });
    (__VLS_ctx.formatChange(__VLS_ctx.marketData.volume_24h_change_24h));
}
else {
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("error-section") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("error-icon") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.fetchMarketData) }, ...{ class: ("btn btn-primary") }, });
}
__VLS_styleScopedClasses['market-page'];
__VLS_styleScopedClasses['container'];
__VLS_styleScopedClasses['page-header'];
__VLS_styleScopedClasses['page-title'];
__VLS_styleScopedClasses['page-subtitle'];
__VLS_styleScopedClasses['loading-section'];
__VLS_styleScopedClasses['loading-spinner'];
__VLS_styleScopedClasses['market-content'];
__VLS_styleScopedClasses['key-metrics'];
__VLS_styleScopedClasses['metric-card'];
__VLS_styleScopedClasses['primary'];
__VLS_styleScopedClasses['metric-icon'];
__VLS_styleScopedClasses['metric-content'];
__VLS_styleScopedClasses['metric-label'];
__VLS_styleScopedClasses['metric-value'];
__VLS_styleScopedClasses['metric-change'];
__VLS_styleScopedClasses['metric-card'];
__VLS_styleScopedClasses['metric-icon'];
__VLS_styleScopedClasses['metric-content'];
__VLS_styleScopedClasses['metric-label'];
__VLS_styleScopedClasses['metric-value'];
__VLS_styleScopedClasses['metric-change'];
__VLS_styleScopedClasses['metric-card'];
__VLS_styleScopedClasses['metric-icon'];
__VLS_styleScopedClasses['metric-content'];
__VLS_styleScopedClasses['metric-label'];
__VLS_styleScopedClasses['metric-value'];
__VLS_styleScopedClasses['metric-card'];
__VLS_styleScopedClasses['metric-icon'];
__VLS_styleScopedClasses['metric-content'];
__VLS_styleScopedClasses['metric-label'];
__VLS_styleScopedClasses['metric-value'];
__VLS_styleScopedClasses['market-details'];
__VLS_styleScopedClasses['details-header'];
__VLS_styleScopedClasses['btn'];
__VLS_styleScopedClasses['btn-primary'];
__VLS_styleScopedClasses['arrow'];
__VLS_styleScopedClasses['details-grid'];
__VLS_styleScopedClasses['detail-card'];
__VLS_styleScopedClasses['detail-value'];
__VLS_styleScopedClasses['detail-date'];
__VLS_styleScopedClasses['detail-card'];
__VLS_styleScopedClasses['detail-value'];
__VLS_styleScopedClasses['detail-date'];
__VLS_styleScopedClasses['detail-card'];
__VLS_styleScopedClasses['detail-value'];
__VLS_styleScopedClasses['detail-subtitle'];
__VLS_styleScopedClasses['detail-card'];
__VLS_styleScopedClasses['detail-value'];
__VLS_styleScopedClasses['detail-subtitle'];
__VLS_styleScopedClasses['detail-card'];
__VLS_styleScopedClasses['detail-value'];
__VLS_styleScopedClasses['detail-subtitle'];
__VLS_styleScopedClasses['detail-card'];
__VLS_styleScopedClasses['detail-value'];
__VLS_styleScopedClasses['market-trends'];
__VLS_styleScopedClasses['trends-grid'];
__VLS_styleScopedClasses['trend-card'];
__VLS_styleScopedClasses['trend-header'];
__VLS_styleScopedClasses['trend-indicator'];
__VLS_styleScopedClasses['trend-bar'];
__VLS_styleScopedClasses['trend-fill'];
__VLS_styleScopedClasses['trend-value'];
__VLS_styleScopedClasses['trend-card'];
__VLS_styleScopedClasses['trend-header'];
__VLS_styleScopedClasses['trend-indicator'];
__VLS_styleScopedClasses['trend-bar'];
__VLS_styleScopedClasses['trend-fill'];
__VLS_styleScopedClasses['trend-value'];
__VLS_styleScopedClasses['error-section'];
__VLS_styleScopedClasses['error-icon'];
__VLS_styleScopedClasses['btn'];
__VLS_styleScopedClasses['btn-primary'];
var __VLS_slots;
var __VLS_inheritedAttrs;
const __VLS_refs = {};
const __VLS_templateResult = { slots: __VLS_slots,
    refs: $refs,
    attrs: {},
};
let __VLS_internalComponent;
//# sourceMappingURL=MarketOverview.vue.js.map
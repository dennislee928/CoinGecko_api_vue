import { defineComponent, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useCoinStore } from '../stores/coinStore';
import NavbarItem from '../components/Navbar.vue';
export default defineComponent({
    name: 'CoinList',
    components: {
        NavbarItem
    },
    setup() {
        const router = useRouter();
        const { t } = useI18n();
        const coinStore = useCoinStore();
        const filters = computed(() => [
            { label: t('coins.filters.all'), value: 'all' },
            { label: t('coins.filters.top10'), value: 'top10' },
            { label: t('coins.filters.top50'), value: 'top50' },
            { label: t('coins.filters.top100'), value: 'top100' }
        ]);
        // 使用store的getters
        const displayedCoins = computed(() => coinStore.displayedCoins);
        const loading = computed(() => coinStore.loading);
        const hasMore = computed(() => coinStore.hasMore);
        const searchQuery = computed(() => coinStore.searchQuery);
        const currentFilter = computed(() => coinStore.filter);
        // 格式化價格
        const formatPrice = (price) => {
            if (!price)
                return '0.00';
            if (price < 0.01)
                return price.toFixed(6);
            if (price < 1)
                return price.toFixed(4);
            if (price < 100)
                return price.toFixed(2);
            return price.toLocaleString('en-US', { maximumFractionDigits: 2 });
        };
        // 格式化變化百分比
        const formatChange = (change) => {
            if (!change)
                return '0.00%';
            return `${change > 0 ? '+' : ''}${change.toFixed(2)}%`;
        };
        // 取得變化樣式類別
        const getChangeClass = (change) => {
            if (!change)
                return 'neutral';
            return change > 0 ? 'positive' : 'negative';
        };
        // 取得幣種圖示
        const getCoinIcon = (symbol) => {
            const icons = {
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
            };
            return icons[symbol.toLowerCase()] || '🪙';
        };
        // 搜尋處理
        const handleSearch = () => {
            coinStore.setSearchQuery(searchQuery.value);
        };
        // 設定篩選
        const setFilter = (filter) => {
            coinStore.setFilter(filter);
        };
        // 載入更多
        const loadMore = async () => {
            await coinStore.loadMore();
        };
        // 前往幣種詳情
        const goToCoinDetail = (coinId) => {
            router.push({ name: 'CoinDetail', params: { id: coinId } });
        };
        // 監聽搜尋變化
        watch(searchQuery, () => {
            handleSearch();
        });
        onMounted(() => {
            coinStore.fetchCoins();
        });
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
        };
    }
});
const __VLS_ctxBase = {};
const __VLS_ctx = __VLS_ctxBase;
const __VLS_localComponents = {
    ...{
        NavbarItem
    },
    ...{},
    ...{},
    ...__VLS_ctxBase,
};
let __VLS_components;
let __VLS_styleScopedClasses;
__VLS_styleScopedClasses['search-input'];
__VLS_styleScopedClasses['filter-btn'];
__VLS_styleScopedClasses['filter-btn'];
__VLS_styleScopedClasses['loading-section'];
__VLS_styleScopedClasses['coin-card'];
__VLS_styleScopedClasses['coin-card'];
__VLS_styleScopedClasses['coin-card'];
__VLS_styleScopedClasses['change-value'];
__VLS_styleScopedClasses['change-value'];
__VLS_styleScopedClasses['change-value'];
__VLS_styleScopedClasses['no-results'];
__VLS_styleScopedClasses['no-results'];
__VLS_styleScopedClasses['page-title'];
__VLS_styleScopedClasses['coins-grid'];
__VLS_styleScopedClasses['coin-card'];
__VLS_styleScopedClasses['filter-buttons'];
__VLS_styleScopedClasses['filter-btn'];
// CSS variable injection 
// CSS variable injection end 
let __VLS_resolvedLocalAndGlobalComponents;
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("coins-page") }, });
const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.NavbarItem;
/** @type { [typeof __VLS_components.NavbarItem, ] } */
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("page-header") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("page-title") }, });
(__VLS_ctx.t('page.coinList'));
__VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("page-subtitle") }, });
(__VLS_ctx.t('page.coinListSubtitle'));
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("search-section") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("search-box") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("search-icon") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: ((event) => __VLS_ctx.coinStore.setSearchQuery(event.target?.value || '')) }, value: ((__VLS_ctx.searchQuery)), type: ("text"), placeholder: ((__VLS_ctx.t('coins.searchPlaceholder'))), ...{ class: ("search-input") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("filter-buttons") }, });
for (const [filter] of __VLS_getVForSourceType((__VLS_ctx.filters))) {
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.setFilter(filter.value);
            } }, key: ((filter.value)), ...{ class: ((['filter-btn', { active: __VLS_ctx.currentFilter === filter.value }])) }, });
    (filter.label);
}
if (__VLS_ctx.loading && !__VLS_ctx.displayedCoins.length) {
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("loading-section") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("loading-spinner") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.t('coins.loading'));
}
else {
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("coins-grid") }, });
    for (const [coin] of __VLS_getVForSourceType((__VLS_ctx.displayedCoins))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (...[$event]) => {
                    if (!(!((__VLS_ctx.loading && !__VLS_ctx.displayedCoins.length))))
                        return;
                    __VLS_ctx.goToCoinDetail(coin.id);
                } }, key: ((coin.id)), ...{ class: ("coin-card") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("coin-header") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("coin-icon") }, });
        (__VLS_ctx.getCoinIcon(coin.symbol));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("coin-info") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("coin-name") }, });
        (coin.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("coin-symbol") }, });
        (coin.symbol.toUpperCase());
        if (coin.rank) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("coin-rank") }, });
            (coin.rank);
        }
        if (coin.price) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("coin-details") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("price-info") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("price-label") }, });
            (__VLS_ctx.t('coins.price'));
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("price-value") }, });
            (__VLS_ctx.formatPrice(coin.price));
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("change-info") }, ...{ class: ((__VLS_ctx.getChangeClass(coin.change_24h))) }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("change-label") }, });
            (__VLS_ctx.t('coins.change24h'));
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("change-value") }, });
            (__VLS_ctx.formatChange(coin.change_24h));
        }
        else {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("coin-details skeleton") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("skeleton-line") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("skeleton-line") }, });
        }
    }
}
if (__VLS_ctx.hasMore && !__VLS_ctx.loading) {
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("load-more-section") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.loadMore) }, ...{ class: ("btn btn-primary load-more-btn") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.t('coins.loadMore'));
}
if (!__VLS_ctx.loading && !__VLS_ctx.displayedCoins.length) {
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("no-results") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("no-results-icon") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (__VLS_ctx.t('coins.noResults'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.t('coins.noResultsMessage'));
}
__VLS_styleScopedClasses['coins-page'];
__VLS_styleScopedClasses['container'];
__VLS_styleScopedClasses['page-header'];
__VLS_styleScopedClasses['page-title'];
__VLS_styleScopedClasses['page-subtitle'];
__VLS_styleScopedClasses['search-section'];
__VLS_styleScopedClasses['search-box'];
__VLS_styleScopedClasses['search-icon'];
__VLS_styleScopedClasses['search-input'];
__VLS_styleScopedClasses['filter-buttons'];
__VLS_styleScopedClasses['active'];
__VLS_styleScopedClasses['filter-btn'];
__VLS_styleScopedClasses['loading-section'];
__VLS_styleScopedClasses['loading-spinner'];
__VLS_styleScopedClasses['coins-grid'];
__VLS_styleScopedClasses['coin-card'];
__VLS_styleScopedClasses['coin-header'];
__VLS_styleScopedClasses['coin-icon'];
__VLS_styleScopedClasses['coin-info'];
__VLS_styleScopedClasses['coin-name'];
__VLS_styleScopedClasses['coin-symbol'];
__VLS_styleScopedClasses['coin-rank'];
__VLS_styleScopedClasses['coin-details'];
__VLS_styleScopedClasses['price-info'];
__VLS_styleScopedClasses['price-label'];
__VLS_styleScopedClasses['price-value'];
__VLS_styleScopedClasses['change-info'];
__VLS_styleScopedClasses['change-label'];
__VLS_styleScopedClasses['change-value'];
__VLS_styleScopedClasses['coin-details'];
__VLS_styleScopedClasses['skeleton'];
__VLS_styleScopedClasses['skeleton-line'];
__VLS_styleScopedClasses['skeleton-line'];
__VLS_styleScopedClasses['load-more-section'];
__VLS_styleScopedClasses['btn'];
__VLS_styleScopedClasses['btn-primary'];
__VLS_styleScopedClasses['load-more-btn'];
__VLS_styleScopedClasses['no-results'];
__VLS_styleScopedClasses['no-results-icon'];
var __VLS_slots;
var __VLS_inheritedAttrs;
const __VLS_refs = {};
const __VLS_templateResult = { slots: __VLS_slots,
    refs: $refs,
    attrs: {},
};
let __VLS_internalComponent;
//# sourceMappingURL=Coins.vue.js.map
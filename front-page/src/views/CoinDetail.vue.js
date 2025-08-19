import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import NavbarItem from '../components/Navbar.vue';
export default defineComponent({
    name: 'CoinDetail',
    components: {
        NavbarItem
    },
    setup() {
        const route = useRoute();
        const coinData = ref(null);
        const loading = ref(true);
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
        // 格式化日期
        const formatDate = (dateString) => {
            if (!dateString)
                return 'N/A';
            return new Date(dateString).toLocaleDateString('zh-TW');
        };
        // 格式化連結類型
        const formatLinkType = (type) => {
            const typeMap = {
                website: '官方網站',
                twitter: 'Twitter',
                reddit: 'Reddit',
                source_code: '原始碼',
                technical_doc: '技術文件',
                explorer: '區塊鏈瀏覽器',
                message_board: '討論區'
            };
            return typeMap[type] || type;
        };
        // 取得連結圖示
        const getLinkIcon = (type) => {
            const icons = {
                website: '🌐',
                twitter: '🐦',
                reddit: '🤖',
                source_code: '💻',
                technical_doc: '📄',
                explorer: '🔍',
                message_board: '💬'
            };
            return icons[type] || '🔗';
        };
        // 從URL取得域名
        const getDomainFromUrl = (url) => {
            try {
                const urlString = String(url);
                const domain = new URL(urlString).hostname.replace('www.', '');
                return domain;
            }
            catch {
                return String(url);
            }
        };
        // 載入幣種資料
        const fetchCoinData = async () => {
            try {
                loading.value = true;
                const response = await fetch(`https://api.coinpaprika.com/v1/coins/${route.params.id}`);
                if (!response.ok)
                    throw new Error('Network response was not ok');
                const data = await response.json();
                coinData.value = data;
            }
            catch (error) {
                console.error('Error fetching coin data:', error);
                coinData.value = null;
            }
            finally {
                loading.value = false;
            }
        };
        onMounted(() => {
            fetchCoinData();
        });
        return {
            coinData,
            loading,
            getCoinIcon,
            formatDate,
            formatLinkType,
            getLinkIcon,
            getDomainFromUrl,
            fetchCoinData
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
__VLS_styleScopedClasses['loading-section'];
__VLS_styleScopedClasses['status-badge'];
__VLS_styleScopedClasses['status-badge'];
__VLS_styleScopedClasses['info-card'];
__VLS_styleScopedClasses['info-item'];
__VLS_styleScopedClasses['link-item'];
__VLS_styleScopedClasses['link-item'];
__VLS_styleScopedClasses['link-arrow'];
__VLS_styleScopedClasses['whitepaper-content'];
__VLS_styleScopedClasses['whitepaper-content'];
__VLS_styleScopedClasses['whitepaper-arrow'];
__VLS_styleScopedClasses['description-card'];
__VLS_styleScopedClasses['error-section'];
__VLS_styleScopedClasses['error-section'];
__VLS_styleScopedClasses['coin-header'];
__VLS_styleScopedClasses['coin-info'];
__VLS_styleScopedClasses['coin-name'];
__VLS_styleScopedClasses['info-grid'];
__VLS_styleScopedClasses['info-card'];
__VLS_styleScopedClasses['coin-icon'];
__VLS_styleScopedClasses['coin-placeholder'];
// CSS variable injection 
// CSS variable injection end 
let __VLS_resolvedLocalAndGlobalComponents;
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("coin-detail-page") }, });
const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.NavbarItem;
/** @type { [typeof __VLS_components.NavbarItem, ] } */
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
if (__VLS_ctx.loading) {
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("loading-section") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("loading-spinner") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
else if (__VLS_ctx.coinData) {
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("coin-header") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("coin-info") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("coin-icon") }, });
    if (__VLS_ctx.coinData.logo) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.coinData.logo)), alt: ((__VLS_ctx.coinData.name)), ...{ class: ("coin-logo") }, });
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("coin-placeholder") }, });
        (__VLS_ctx.getCoinIcon(__VLS_ctx.coinData.symbol));
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("coin-details") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("coin-name") }, });
    (__VLS_ctx.coinData.name);
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("coin-symbol") }, });
    (__VLS_ctx.coinData.symbol.toUpperCase());
    if (__VLS_ctx.coinData.rank) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("coin-rank") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("rank-label") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("rank-value") }, });
        (__VLS_ctx.coinData.rank);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("coin-status") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("status-badge") }, ...{ class: (({ active: __VLS_ctx.coinData.is_active })) }, });
    (__VLS_ctx.coinData.is_active ? '活躍' : '非活躍');
    if (__VLS_ctx.coinData.is_new) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("status-badge") }, ...{ class: (({ new: __VLS_ctx.coinData.is_new })) }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("info-grid") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("info-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("info-list") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("info-item") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("info-label") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("info-value") }, });
    (__VLS_ctx.coinData.type || 'N/A');
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("info-item") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("info-label") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("info-value") }, });
    (__VLS_ctx.coinData.development_status || 'N/A');
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("info-item") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("info-label") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("info-value") }, });
    (__VLS_ctx.coinData.hardware_wallet ? '支援' : '不支援');
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("info-item") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("info-label") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("info-value") }, });
    (__VLS_ctx.coinData.proof_type || 'N/A');
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("info-item") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("info-label") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("info-value") }, });
    (__VLS_ctx.coinData.hash_algorithm || 'N/A');
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("info-item") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("info-label") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("info-value") }, });
    (__VLS_ctx.coinData.org_structure || 'N/A');
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("info-item") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("info-label") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("info-value") }, });
    (__VLS_ctx.formatDate(__VLS_ctx.coinData.started_at));
    if (__VLS_ctx.coinData.tags && __VLS_ctx.coinData.tags.length) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("info-card") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("tags-container") }, });
        for (const [tag] of __VLS_getVForSourceType((__VLS_ctx.coinData.tags))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ key: ((tag.id)), ...{ class: ("tag") }, });
            (tag.name);
        }
    }
    if (__VLS_ctx.coinData.team && __VLS_ctx.coinData.team.length) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("info-card") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("team-list") }, });
        for (const [member] of __VLS_getVForSourceType((__VLS_ctx.coinData.team))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((member.id)), ...{ class: ("team-member") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("member-info") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("member-name") }, });
            (member.name);
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("member-position") }, });
            (member.position);
        }
    }
    if (__VLS_ctx.coinData.links) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("info-card") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("links-container") }, });
        for (const [link, type] of __VLS_getVForSourceType((__VLS_ctx.coinData.links))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((type)), ...{ class: ("link-group") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({ ...{ class: ("link-type") }, });
            (__VLS_ctx.formatLinkType(String(type)));
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("link-list") }, });
            for (const [url] of __VLS_getVForSourceType((link))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ key: ((url)), href: ((url)), target: ("_blank"), rel: ("noopener noreferrer"), ...{ class: ("link-item") }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("link-icon") }, });
                (__VLS_ctx.getLinkIcon(String(type)));
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("link-text") }, });
                (__VLS_ctx.getDomainFromUrl(url));
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("link-arrow") }, });
            }
        }
    }
    if (__VLS_ctx.coinData.whitepaper && __VLS_ctx.coinData.whitepaper.link) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("info-card") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ((__VLS_ctx.coinData.whitepaper.link)), target: ("_blank"), rel: ("noopener noreferrer"), ...{ class: ("whitepaper-link") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("whitepaper-content") }, });
        if (__VLS_ctx.coinData.whitepaper.thumbnail) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.coinData.whitepaper.thumbnail)), alt: ("白皮書縮圖"), ...{ class: ("whitepaper-thumbnail") }, });
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("whitepaper-info") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("whitepaper-text") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("whitepaper-arrow") }, });
    }
    if (__VLS_ctx.coinData.description) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("description-card") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("description-text") }, });
        (__VLS_ctx.coinData.description);
    }
}
else {
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("error-section") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("error-icon") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.fetchCoinData) }, ...{ class: ("btn btn-primary") }, });
}
__VLS_styleScopedClasses['coin-detail-page'];
__VLS_styleScopedClasses['loading-section'];
__VLS_styleScopedClasses['loading-spinner'];
__VLS_styleScopedClasses['container'];
__VLS_styleScopedClasses['coin-header'];
__VLS_styleScopedClasses['coin-info'];
__VLS_styleScopedClasses['coin-icon'];
__VLS_styleScopedClasses['coin-logo'];
__VLS_styleScopedClasses['coin-placeholder'];
__VLS_styleScopedClasses['coin-details'];
__VLS_styleScopedClasses['coin-name'];
__VLS_styleScopedClasses['coin-symbol'];
__VLS_styleScopedClasses['coin-rank'];
__VLS_styleScopedClasses['rank-label'];
__VLS_styleScopedClasses['rank-value'];
__VLS_styleScopedClasses['coin-status'];
__VLS_styleScopedClasses['status-badge'];
__VLS_styleScopedClasses['active'];
__VLS_styleScopedClasses['status-badge'];
__VLS_styleScopedClasses['new'];
__VLS_styleScopedClasses['info-grid'];
__VLS_styleScopedClasses['info-card'];
__VLS_styleScopedClasses['info-list'];
__VLS_styleScopedClasses['info-item'];
__VLS_styleScopedClasses['info-label'];
__VLS_styleScopedClasses['info-value'];
__VLS_styleScopedClasses['info-item'];
__VLS_styleScopedClasses['info-label'];
__VLS_styleScopedClasses['info-value'];
__VLS_styleScopedClasses['info-item'];
__VLS_styleScopedClasses['info-label'];
__VLS_styleScopedClasses['info-value'];
__VLS_styleScopedClasses['info-item'];
__VLS_styleScopedClasses['info-label'];
__VLS_styleScopedClasses['info-value'];
__VLS_styleScopedClasses['info-item'];
__VLS_styleScopedClasses['info-label'];
__VLS_styleScopedClasses['info-value'];
__VLS_styleScopedClasses['info-item'];
__VLS_styleScopedClasses['info-label'];
__VLS_styleScopedClasses['info-value'];
__VLS_styleScopedClasses['info-item'];
__VLS_styleScopedClasses['info-label'];
__VLS_styleScopedClasses['info-value'];
__VLS_styleScopedClasses['info-card'];
__VLS_styleScopedClasses['tags-container'];
__VLS_styleScopedClasses['tag'];
__VLS_styleScopedClasses['info-card'];
__VLS_styleScopedClasses['team-list'];
__VLS_styleScopedClasses['team-member'];
__VLS_styleScopedClasses['member-info'];
__VLS_styleScopedClasses['member-name'];
__VLS_styleScopedClasses['member-position'];
__VLS_styleScopedClasses['info-card'];
__VLS_styleScopedClasses['links-container'];
__VLS_styleScopedClasses['link-group'];
__VLS_styleScopedClasses['link-type'];
__VLS_styleScopedClasses['link-list'];
__VLS_styleScopedClasses['link-item'];
__VLS_styleScopedClasses['link-icon'];
__VLS_styleScopedClasses['link-text'];
__VLS_styleScopedClasses['link-arrow'];
__VLS_styleScopedClasses['info-card'];
__VLS_styleScopedClasses['whitepaper-link'];
__VLS_styleScopedClasses['whitepaper-content'];
__VLS_styleScopedClasses['whitepaper-thumbnail'];
__VLS_styleScopedClasses['whitepaper-info'];
__VLS_styleScopedClasses['whitepaper-text'];
__VLS_styleScopedClasses['whitepaper-arrow'];
__VLS_styleScopedClasses['description-card'];
__VLS_styleScopedClasses['description-text'];
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
//# sourceMappingURL=CoinDetail.vue.js.map
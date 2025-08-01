import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import LanguageSelector from './LanguageSelector.vue';
export default defineComponent({
    name: 'NavbarItem',
    components: {
        LanguageSelector
    },
    setup() {
        const { t } = useI18n();
        const isMobileMenuOpen = ref(false);
        const toggleMobileMenu = () => {
            isMobileMenuOpen.value = !isMobileMenuOpen.value;
        };
        const closeMobileMenu = () => {
            isMobileMenuOpen.value = false;
        };
        return {
            t,
            isMobileMenuOpen,
            toggleMobileMenu,
            closeMobileMenu
        };
    }
});
const __VLS_ctxBase = {};
const __VLS_ctx = __VLS_ctxBase;
const __VLS_localComponents = {
    ...{
        LanguageSelector
    },
    ...{},
    ...{},
    ...__VLS_ctxBase,
};
let __VLS_components;
let __VLS_styleScopedClasses;
__VLS_styleScopedClasses['navbar-logo'];
__VLS_styleScopedClasses['nav-link'];
__VLS_styleScopedClasses['nav-link'];
__VLS_styleScopedClasses['nav-link'];
__VLS_styleScopedClasses['active'];
__VLS_styleScopedClasses['navbar-mobile-toggle'];
__VLS_styleScopedClasses['mobile-menu'];
__VLS_styleScopedClasses['active'];
__VLS_styleScopedClasses['mobile-nav-link'];
__VLS_styleScopedClasses['navbar-menu'];
__VLS_styleScopedClasses['navbar-mobile-toggle'];
__VLS_styleScopedClasses['mobile-menu'];
__VLS_styleScopedClasses['navbar-logo'];
__VLS_styleScopedClasses['navbar-container'];
__VLS_styleScopedClasses['navbar-logo'];
// CSS variable injection 
// CSS variable injection end 
let __VLS_resolvedLocalAndGlobalComponents;
__VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({ ...{ class: ("navbar") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("navbar-container") }, });
const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
/** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ to: ("/"), ...{ class: ("navbar-logo") }, }));
const __VLS_2 = __VLS_1({ to: ("/"), ...{ class: ("navbar-logo") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("logo-icon") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_nonNullable(__VLS_5.slots).default;
const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("navbar-menu") }, });
const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
/** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ to: ("/"), ...{ class: ("nav-link") }, activeClass: ("active"), }));
const __VLS_8 = __VLS_7({ to: ("/"), ...{ class: ("nav-link") }, activeClass: ("active"), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("nav-icon") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("nav-text") }, });
(__VLS_ctx.t('nav.marketOverview'));
__VLS_nonNullable(__VLS_11.slots).default;
const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
/** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ to: ("/coins"), ...{ class: ("nav-link") }, activeClass: ("active"), }));
const __VLS_14 = __VLS_13({ to: ("/coins"), ...{ class: ("nav-link") }, activeClass: ("active"), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("nav-icon") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("nav-text") }, });
(__VLS_ctx.t('nav.coinList'));
__VLS_nonNullable(__VLS_17.slots).default;
const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.LanguageSelector;
/** @type { [typeof __VLS_components.LanguageSelector, ] } */
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({}));
const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (__VLS_ctx.toggleMobileMenu) }, ...{ class: ("navbar-mobile-toggle") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mobile-menu") }, ...{ class: (({ active: __VLS_ctx.isMobileMenuOpen })) }, });
const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
/** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ ...{ 'onClick': {} }, to: ("/"), ...{ class: ("mobile-nav-link") }, }));
const __VLS_26 = __VLS_25({ ...{ 'onClick': {} }, to: ("/"), ...{ class: ("mobile-nav-link") }, }, ...__VLS_functionalComponentArgsRest(__VLS_25));
let __VLS_30;
const __VLS_31 = {
    onClick: (__VLS_ctx.closeMobileMenu)
};
let __VLS_27;
let __VLS_28;
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("nav-icon") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.t('nav.marketOverview'));
__VLS_nonNullable(__VLS_29.slots).default;
const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_24, __VLS_26);
const __VLS_32 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
/** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({ ...{ 'onClick': {} }, to: ("/coins"), ...{ class: ("mobile-nav-link") }, }));
const __VLS_34 = __VLS_33({ ...{ 'onClick': {} }, to: ("/coins"), ...{ class: ("mobile-nav-link") }, }, ...__VLS_functionalComponentArgsRest(__VLS_33));
let __VLS_38;
const __VLS_39 = {
    onClick: (__VLS_ctx.closeMobileMenu)
};
let __VLS_35;
let __VLS_36;
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("nav-icon") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.t('nav.coinList'));
__VLS_nonNullable(__VLS_37.slots).default;
const __VLS_37 = __VLS_pickFunctionalComponentCtx(__VLS_32, __VLS_34);
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mobile-language-selector") }, });
const __VLS_40 = __VLS_resolvedLocalAndGlobalComponents.LanguageSelector;
/** @type { [typeof __VLS_components.LanguageSelector, ] } */
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({}));
const __VLS_42 = __VLS_41({}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_styleScopedClasses['navbar'];
__VLS_styleScopedClasses['navbar-container'];
__VLS_styleScopedClasses['navbar-logo'];
__VLS_styleScopedClasses['logo-icon'];
__VLS_styleScopedClasses['navbar-menu'];
__VLS_styleScopedClasses['nav-link'];
__VLS_styleScopedClasses['nav-icon'];
__VLS_styleScopedClasses['nav-text'];
__VLS_styleScopedClasses['nav-link'];
__VLS_styleScopedClasses['nav-icon'];
__VLS_styleScopedClasses['nav-text'];
__VLS_styleScopedClasses['navbar-mobile-toggle'];
__VLS_styleScopedClasses['mobile-menu'];
__VLS_styleScopedClasses['active'];
__VLS_styleScopedClasses['mobile-nav-link'];
__VLS_styleScopedClasses['nav-icon'];
__VLS_styleScopedClasses['mobile-nav-link'];
__VLS_styleScopedClasses['nav-icon'];
__VLS_styleScopedClasses['mobile-language-selector'];
var __VLS_slots;
var __VLS_inheritedAttrs;
const __VLS_refs = {};
const __VLS_templateResult = { slots: __VLS_slots,
    refs: $refs,
    attrs: {},
};
let __VLS_internalComponent;
//# sourceMappingURL=Navbar.vue.js.map
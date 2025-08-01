import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { setLocale, getSupportedLocales } from '../i18n';
export default defineComponent({
    name: 'LanguageSelector',
    setup() {
        const { locale } = useI18n();
        const isOpen = ref(false);
        const supportedLocales = getSupportedLocales();
        const currentLocaleCode = computed(() => locale.value);
        const currentLocale = computed(() => {
            return supportedLocales.find((l) => l.code === currentLocaleCode.value) || supportedLocales[0];
        });
        const toggleDropdown = () => {
            isOpen.value = !isOpen.value;
        };
        const selectLocale = (code) => {
            if (code === 'zh' || code === 'en') {
                setLocale(code);
                isOpen.value = false;
            }
        };
        const closeDropdown = (event) => {
            const target = event.target;
            if (!target.closest('.language-selector')) {
                isOpen.value = false;
            }
        };
        onMounted(() => {
            document.addEventListener('click', closeDropdown);
        });
        onUnmounted(() => {
            document.removeEventListener('click', closeDropdown);
        });
        return {
            isOpen,
            supportedLocales,
            currentLocale,
            currentLocaleCode,
            toggleDropdown,
            selectLocale
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
__VLS_styleScopedClasses['language-button'];
__VLS_styleScopedClasses['language-button'];
__VLS_styleScopedClasses['dropdown-arrow'];
__VLS_styleScopedClasses['dropdown-item'];
__VLS_styleScopedClasses['dropdown-item'];
__VLS_styleScopedClasses['active'];
__VLS_styleScopedClasses['current-name'];
__VLS_styleScopedClasses['language-button'];
__VLS_styleScopedClasses['dropdown-menu'];
// CSS variable injection 
// CSS variable injection end 
let __VLS_resolvedLocalAndGlobalComponents;
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("language-selector") }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.toggleDropdown) }, ...{ class: ("language-button") }, ...{ class: (({ active: __VLS_ctx.isOpen })) }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("current-flag") }, });
(__VLS_ctx.currentLocale.flag);
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("current-name") }, });
(__VLS_ctx.currentLocale.name);
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("dropdown-arrow") }, ...{ class: (({ rotated: __VLS_ctx.isOpen })) }, });
if (__VLS_ctx.isOpen) {
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("dropdown-menu") }, });
    for (const [locale] of __VLS_getVForSourceType((__VLS_ctx.supportedLocales))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.isOpen)))
                        return;
                    __VLS_ctx.selectLocale(locale.code);
                } }, key: ((locale.code)), ...{ class: ("dropdown-item") }, ...{ class: (({ active: locale.code === __VLS_ctx.currentLocaleCode })) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("locale-flag") }, });
        (locale.flag);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("locale-name") }, });
        (locale.name);
    }
}
__VLS_styleScopedClasses['language-selector'];
__VLS_styleScopedClasses['language-button'];
__VLS_styleScopedClasses['active'];
__VLS_styleScopedClasses['current-flag'];
__VLS_styleScopedClasses['current-name'];
__VLS_styleScopedClasses['dropdown-arrow'];
__VLS_styleScopedClasses['rotated'];
__VLS_styleScopedClasses['dropdown-menu'];
__VLS_styleScopedClasses['dropdown-item'];
__VLS_styleScopedClasses['active'];
__VLS_styleScopedClasses['locale-flag'];
__VLS_styleScopedClasses['locale-name'];
var __VLS_slots;
var __VLS_inheritedAttrs;
const __VLS_refs = {};
const __VLS_templateResult = { slots: __VLS_slots,
    refs: $refs,
    attrs: {},
};
let __VLS_internalComponent;
//# sourceMappingURL=LanguageSelector.vue.js.map
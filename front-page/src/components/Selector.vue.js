import { defineComponent, ref, computed, onMounted, onUnmounted, watch } from 'vue';
export default defineComponent({
    name: 'AppSelector',
    props: {
        modelValue: {
            type: [String, Number],
            default: null
        },
        options: {
            type: Array,
            required: true
        },
        placeholder: {
            type: String,
            default: '請選擇...'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const isOpen = ref(false);
        const selectedOption = computed(() => {
            return props.options.find((option) => option.value === props.modelValue);
        });
        const toggleDropdown = () => {
            if (!props.disabled) {
                isOpen.value = !isOpen.value;
            }
        };
        const selectOption = (option) => {
            if (option.disabled)
                return;
            emit('update:modelValue', option.value);
            emit('change', option);
            isOpen.value = false;
        };
        const closeDropdown = (event) => {
            const target = event.target;
            if (!target.closest('.selector')) {
                isOpen.value = false;
            }
        };
        const handleKeydown = (event) => {
            if (event.key === 'Escape') {
                isOpen.value = false;
            }
        };
        onMounted(() => {
            document.addEventListener('click', closeDropdown);
            document.addEventListener('keydown', handleKeydown);
        });
        onUnmounted(() => {
            document.removeEventListener('click', closeDropdown);
            document.removeEventListener('keydown', handleKeydown);
        });
        // 監聽外部變化，關閉下拉選單
        watch(() => props.modelValue, () => {
            if (isOpen.value) {
                isOpen.value = false;
            }
        });
        return {
            isOpen,
            selectedOption,
            toggleDropdown,
            selectOption
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
__VLS_styleScopedClasses['selector'];
__VLS_styleScopedClasses['selector-button'];
__VLS_styleScopedClasses['selector-button'];
__VLS_styleScopedClasses['selector-button'];
__VLS_styleScopedClasses['disabled'];
__VLS_styleScopedClasses['selector-button'];
__VLS_styleScopedClasses['active'];
__VLS_styleScopedClasses['selector-text'];
__VLS_styleScopedClasses['selector-button'];
__VLS_styleScopedClasses['active'];
__VLS_styleScopedClasses['dropdown-arrow'];
__VLS_styleScopedClasses['dropdown-arrow'];
__VLS_styleScopedClasses['dropdown-item'];
__VLS_styleScopedClasses['dropdown-item'];
__VLS_styleScopedClasses['active'];
__VLS_styleScopedClasses['dropdown-item'];
__VLS_styleScopedClasses['disabled'];
__VLS_styleScopedClasses['dropdown-item'];
__VLS_styleScopedClasses['active'];
__VLS_styleScopedClasses['item-description'];
__VLS_styleScopedClasses['dropdown-list'];
__VLS_styleScopedClasses['dropdown-list'];
__VLS_styleScopedClasses['dropdown-list'];
__VLS_styleScopedClasses['dropdown-list'];
__VLS_styleScopedClasses['selector-button'];
__VLS_styleScopedClasses['dropdown-item'];
// CSS variable injection 
// CSS variable injection end 
let __VLS_resolvedLocalAndGlobalComponents;
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("selector") }, ...{ class: (({ disabled: __VLS_ctx.disabled })) }, });
__VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.toggleDropdown) }, ...{ class: ("selector-button") }, ...{ class: (({ active: __VLS_ctx.isOpen, disabled: __VLS_ctx.disabled })) }, disabled: ((__VLS_ctx.disabled)), });
__VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("selector-content") }, });
var __VLS_0 = {
    selected: ((__VLS_ctx.selectedOption)),
};
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("selector-text") }, });
(__VLS_ctx.selectedOption?.label || __VLS_ctx.placeholder);
__VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("dropdown-arrow") }, ...{ class: (({ rotated: __VLS_ctx.isOpen })) }, });
const __VLS_1 = __VLS_resolvedLocalAndGlobalComponents.Transition;
/** @type { [typeof __VLS_components.Transition, typeof __VLS_components.Transition, ] } */
// @ts-ignore
const __VLS_2 = __VLS_asFunctionalComponent(__VLS_1, new __VLS_1({ name: ("dropdown"), }));
const __VLS_3 = __VLS_2({ name: ("dropdown"), }, ...__VLS_functionalComponentArgsRest(__VLS_2));
if (__VLS_ctx.isOpen) {
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("dropdown-menu") }, });
    if (__VLS_ctx.$slots.header) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("dropdown-header") }, });
        var __VLS_7 = {};
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("dropdown-list") }, });
    for (const [option] of __VLS_getVForSourceType((__VLS_ctx.options))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.isOpen)))
                        return;
                    __VLS_ctx.selectOption(option);
                } }, key: ((option.value)), ...{ class: ("dropdown-item") }, ...{ class: (({
                    active: option.value === __VLS_ctx.selectedOption?.value,
                    disabled: option.disabled
                })) }, disabled: ((option.disabled)), });
        var __VLS_8 = {
            option: ((option)),
        };
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("item-label") }, });
        (option.label);
        if (option.description) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("item-description") }, });
            (option.description);
        }
        __VLS_nonNullable(__VLS_6.slots).default;
    }
    if (__VLS_ctx.$slots.footer) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("dropdown-footer") }, });
        var __VLS_9 = {};
    }
}
__VLS_nonNullable(__VLS_6.slots).default;
const __VLS_6 = __VLS_pickFunctionalComponentCtx(__VLS_1, __VLS_3);
__VLS_styleScopedClasses['selector'];
__VLS_styleScopedClasses['disabled'];
__VLS_styleScopedClasses['selector-button'];
__VLS_styleScopedClasses['active'];
__VLS_styleScopedClasses['disabled'];
__VLS_styleScopedClasses['selector-content'];
__VLS_styleScopedClasses['selector-text'];
__VLS_styleScopedClasses['dropdown-arrow'];
__VLS_styleScopedClasses['rotated'];
__VLS_styleScopedClasses['dropdown-menu'];
__VLS_styleScopedClasses['dropdown-header'];
__VLS_styleScopedClasses['dropdown-list'];
__VLS_styleScopedClasses['dropdown-item'];
__VLS_styleScopedClasses['active'];
__VLS_styleScopedClasses['disabled'];
__VLS_styleScopedClasses['item-label'];
__VLS_styleScopedClasses['item-description'];
__VLS_styleScopedClasses['dropdown-footer'];
var __VLS_slots;
var __VLS_inheritedAttrs;
const __VLS_refs = {};
const __VLS_templateResult = { slots: __VLS_slots,
    refs: $refs,
    attrs: {},
};
let __VLS_internalComponent;
//# sourceMappingURL=Selector.vue.js.map
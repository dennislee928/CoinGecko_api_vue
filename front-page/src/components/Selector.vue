<template>
  <div class="selector" :class="{ disabled }">
    <button
      @click="toggleDropdown"
      class="selector-button"
      :class="{ active: isOpen, disabled }"
      :disabled="disabled"
    >
      <div class="selector-content">
        <slot name="button" :selected="selectedOption">
          <span class="selector-text">{{ selectedOption?.label || placeholder }}</span>
        </slot>
      </div>
      <span class="dropdown-arrow" :class="{ rotated: isOpen }">▼</span>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="dropdown-menu">
        <div class="dropdown-header" v-if="$slots.header">
          <slot name="header" />
        </div>

        <div class="dropdown-list">
          <button
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option)"
            class="dropdown-item"
            :class="{
              active: option.value === selectedOption?.value,
              disabled: option.disabled
            }"
            :disabled="option.disabled"
          >
            <slot name="item" :option="option">
              <span class="item-label">{{ option.label }}</span>
              <span v-if="option.description" class="item-description">{{
                option.description
              }}</span>
            </slot>
          </button>
        </div>

        <div class="dropdown-footer" v-if="$slots.footer">
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted, watch } from 'vue'

export interface SelectOption {
  value: string | number
  label: string
  description?: string
  disabled?: boolean
}

export default defineComponent({
  name: 'AppSelector',
  props: {
    modelValue: {
      type: [String, Number],
      default: null
    },
    options: {
      type: Array as () => SelectOption[],
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
    const isOpen = ref(false)

    const selectedOption = computed(() => {
      return props.options.find((option) => option.value === props.modelValue)
    })

    const toggleDropdown = () => {
      if (!props.disabled) {
        isOpen.value = !isOpen.value
      }
    }

    const selectOption = (option: SelectOption) => {
      if (option.disabled) return

      emit('update:modelValue', option.value)
      emit('change', option)
      isOpen.value = false
    }

    const closeDropdown = (event: Event) => {
      const target = event.target as HTMLElement
      if (!target.closest('.selector')) {
        isOpen.value = false
      }
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        isOpen.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', closeDropdown)
      document.addEventListener('keydown', handleKeydown)
    })

    onUnmounted(() => {
      document.removeEventListener('click', closeDropdown)
      document.removeEventListener('keydown', handleKeydown)
    })

    // 監聽外部變化，關閉下拉選單
    watch(
      () => props.modelValue,
      () => {
        if (isOpen.value) {
          isOpen.value = false
        }
      }
    )

    return {
      isOpen,
      selectedOption,
      toggleDropdown,
      selectOption
    }
  }
})
</script>

<style scoped>
.selector {
  position: relative;
  display: inline-block;
  width: 100%;
}

.selector.disabled {
  opacity: 0.6;
  pointer-events: none;
}

.selector-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-weight: 500;
  min-height: 40px;
}

.selector-button:hover:not(.disabled) {
  background: var(--bg-secondary);
  border-color: var(--primary-color);
}

.selector-button.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.selector-button.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.selector-content {
  flex: 1;
  text-align: left;
}

.selector-text {
  color: var(--text-primary);
}

.selector-button.active .selector-text {
  color: white;
}

.dropdown-arrow {
  font-size: 0.75rem;
  transition: transform 0.3s ease;
  color: var(--text-muted);
}

.selector-button.active .dropdown-arrow {
  color: white;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--spacing-xs);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  max-height: 300px;
  overflow: hidden;
}

.dropdown-header {
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

.dropdown-list {
  max-height: 250px;
  overflow-y: auto;
}

.dropdown-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  text-align: left;
  min-height: 40px;
}

.dropdown-item:hover:not(.disabled) {
  background: var(--bg-secondary);
}

.dropdown-item.active {
  background: var(--primary-color);
  color: white;
}

.dropdown-item.disabled {
  cursor: not-allowed;
  opacity: 0.5;
  color: var(--text-muted);
}

.item-label {
  font-weight: 500;
}

.item-description {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: var(--spacing-xs);
}

.dropdown-item.active .item-description {
  color: rgba(255, 255, 255, 0.8);
}

.dropdown-footer {
  padding: var(--spacing-sm) var(--spacing-md);
  border-top: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

/* 動畫 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 滾動條樣式 */
.dropdown-list::-webkit-scrollbar {
  width: 6px;
}

.dropdown-list::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

.dropdown-list::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.dropdown-list::-webkit-scrollbar-thumb:hover {
  background: var(--primary-color);
}

@media (max-width: 768px) {
  .selector-button {
    padding: var(--spacing-sm);
    min-height: 36px;
  }

  .dropdown-item {
    padding: var(--spacing-sm);
    min-height: 36px;
  }
}
</style>

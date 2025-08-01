<template>
  <div class="language-selector">
    <button @click="toggleDropdown" class="language-button" :class="{ active: isOpen }">
      <span class="current-flag">{{ currentLocale.flag }}</span>
      <span class="current-name">{{ currentLocale.name }}</span>
      <span class="dropdown-arrow" :class="{ rotated: isOpen }">▼</span>
    </button>

    <div v-if="isOpen" class="dropdown-menu">
      <button
        v-for="locale in supportedLocales"
        :key="locale.code"
        @click="selectLocale(locale.code)"
        class="dropdown-item"
        :class="{ active: locale.code === currentLocaleCode }"
      >
        <span class="locale-flag">{{ locale.flag }}</span>
        <span class="locale-name">{{ locale.name }}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale, getSupportedLocales } from '../i18n'

export default defineComponent({
  name: 'LanguageSelector',
  setup() {
    const { locale } = useI18n()
    const isOpen = ref(false)

    const supportedLocales = getSupportedLocales()

    const currentLocaleCode = computed(() => locale.value)

    const currentLocale = computed(() => {
      return supportedLocales.find((l) => l.code === currentLocaleCode.value) || supportedLocales[0]
    })

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }

    const selectLocale = (code: string) => {
      if (code === 'zh' || code === 'en') {
        setLocale(code as 'zh' | 'en')
        isOpen.value = false
      }
    }

    const closeDropdown = (event: Event) => {
      const target = event.target as HTMLElement
      if (!target.closest('.language-selector')) {
        isOpen.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', closeDropdown)
    })

    onUnmounted(() => {
      document.removeEventListener('click', closeDropdown)
    })

    return {
      isOpen,
      supportedLocales,
      currentLocale,
      currentLocaleCode,
      toggleDropdown,
      selectLocale
    }
  }
})
</script>

<style scoped>
.language-selector {
  position: relative;
  display: inline-block;
}

.language-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.language-button:hover {
  background: var(--bg-secondary);
  border-color: var(--primary-color);
}

.language-button.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.current-flag {
  font-size: 1.1rem;
}

.current-name {
  font-weight: 500;
}

.dropdown-arrow {
  font-size: 0.75rem;
  transition: transform 0.3s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: var(--spacing-xs);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  min-width: 150px;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  text-align: left;
}

.dropdown-item:hover {
  background: var(--bg-secondary);
}

.dropdown-item.active {
  background: var(--primary-color);
  color: white;
}

.locale-flag {
  font-size: 1rem;
}

.locale-name {
  font-weight: 500;
}

@media (max-width: 768px) {
  .current-name {
    display: none;
  }

  .language-button {
    padding: var(--spacing-sm);
  }

  .dropdown-menu {
    right: 0;
    min-width: 120px;
  }
}
</style>

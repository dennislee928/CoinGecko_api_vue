<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-logo">
        <div class="logo-icon">₿</div>
        <span>Crypto Tracker</span>
      </router-link>
      
      <div class="navbar-menu">
        <router-link to="/" class="nav-link" active-class="active">
          <span class="nav-icon">📊</span>
          <span class="nav-text">市場概覽</span>
        </router-link>
        <router-link to="/coins" class="nav-link" active-class="active">
          <span class="nav-icon">🪙</span>
          <span class="nav-text">幣種列表</span>
        </router-link>
      </div>
      
      <div class="navbar-mobile-toggle" @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    
    <!-- 行動版選單 -->
    <div class="mobile-menu" :class="{ 'active': isMobileMenuOpen }">
      <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">
        <span class="nav-icon">📊</span>
        <span>市場概覽</span>
      </router-link>
      <router-link to="/coins" class="mobile-nav-link" @click="closeMobileMenu">
        <span class="nav-icon">🪙</span>
        <span>幣種列表</span>
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'NavbarItem',
  setup() {
    const isMobileMenuOpen = ref(false)
    
    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }
    
    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false
    }
    
    return {
      isMobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu
    }
  }
})
</script>

<style scoped>
.navbar {
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 700;
  font-size: 1.25rem;
  transition: all 0.3s ease;
}

.navbar-logo:hover {
  color: var(--primary-color);
  transform: translateY(-1px);
}

.logo-icon {
  font-size: 1.5rem;
  color: var(--primary-color);
}

.navbar-menu {
  display: flex;
  gap: var(--spacing-lg);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  text-decoration: none;
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover,
.nav-link.active {
  color: var(--text-primary);
  background: rgba(99, 102, 241, 0.1);
  transform: translateY(-1px);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: var(--primary-color);
  border-radius: 1px;
}

.nav-icon {
  font-size: 1.1rem;
}

.nav-text {
  font-weight: 500;
}

.navbar-mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  padding: var(--spacing-sm);
}

.navbar-mobile-toggle span {
  width: 25px;
  height: 3px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.mobile-menu {
  display: none;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: var(--spacing-md);
  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.3s ease;
}

.mobile-menu.active {
  transform: translateY(0);
  opacity: 1;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  text-decoration: none;
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  margin-bottom: var(--spacing-sm);
}

.mobile-nav-link:hover {
  color: var(--text-primary);
  background: rgba(99, 102, 241, 0.1);
}

@media (max-width: 768px) {
  .navbar-menu {
    display: none;
  }
  
  .navbar-mobile-toggle {
    display: flex;
  }
  
  .mobile-menu {
    display: block;
  }
  
  .navbar-logo span {
    display: none;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    padding: 0 var(--spacing-sm);
  }
  
  .navbar-logo {
    font-size: 1.1rem;
  }
}
</style>

<template>
  <div id="app">
    <NavbarItem />
    <router-view />
    <AppFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavbarItem from './components/Navbar.vue'
import AppFooter from './components/Footer.vue'
export default defineComponent({
  name: 'App',
  components: {
    NavbarItem, // 將 NavbarItem 加入 components 中
    AppFooter
  }
})
</script>

<style>
#app {
  width: 100%; /* 確保整個應用程式全寬 */
  margin: 0; /* 移除外邊距 */
  padding: 0; /* 移除內邊距 */
}

.navbar {
  width: 100%; /* 確保導航欄全寬 */
  padding: 0; /* 移除內邊距 */
  margin: 0; /* 移除外邊距 */
}
</style>

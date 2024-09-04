<template>
  <div id="app">
    <NavbarItem />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavbarItem from './components/Navbar.vue'
export default defineComponent({
  name: 'App',
  components: {
    NavbarItem // 將 NavbarItem 加入 components 中
  }
})
</script>

<style>
/* Your styles here */
</style>

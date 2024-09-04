<template>
  <nav>
    <div class="navbar">
      <div class="navbar-toggle" @click="toggleNavbar">
        <span class="icon">&#9776;</span>
        <!-- 可愛的漢堡圖標 -->
      </div>
      <ul v-if="isNavbarOpen"></ul>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/coins">Coins</router-link></li>
        <!-- 其他導航鏈接 -->
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'AppNavbar',
  setup() {
    const isNavbarOpen = ref(false)
    const toggleNavbar = () => {
      isNavbarOpen.value = !isNavbarOpen.value
    }
    return { isNavbarOpen, toggleNavbar }
  }
})
</script>

<style scoped>
.navbar {
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: space-between; /* 調整為兩端對齊 */
  align-items: center; /* 水平置中 */
  text-align: center; /* 新增這行以確保內容水平置中 */
}

.navbar-toggle {
  cursor: pointer;
  color: white;
  font-size: 24px;
}

.navbar ul {
  list-style-type: none;
  margin: 10;
  padding: 0;
  display: flex;
  flex-direction: row; /* 水平排列 */
}

.navbar li {
  display: block;
}

.navbar a {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
}

.navbar a:hover {
  background-color: #555;
}
</style>

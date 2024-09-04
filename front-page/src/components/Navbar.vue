<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-logo">Crypto Info App</router-link>
      <ul class="navbar-menu">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/coins">Coins</router-link></li>
        <!-- 其他導航項目 -->
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavbarItem'
})
</script>

<style scoped>
.navbar {
  width: 100%; /* 確保導航欄寬度為 100% */
  background-color: #4caf50; /* 深色背景 */
  color: white; /* 白色文字 */
}

.navbar-container {
  display: flex;
  justify-content: space-between; /* 使項目兩端對齊 */
  align-items: center;
  padding: 10px 20px; /* 調整內邊距 */
}

.navbar-logo {
  font-size: 24px;
  color: white;
  text-decoration: none;
}

.navbar-menu {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.navbar-menu li {
  margin-left: 20px; /* 項目之間的間距 */
}

.navbar-menu a {
  color: white; /* 白色文字 */
  text-decoration: none;
}

.navbar-menu a:hover {
  text-decoration: underline; /* 懸停時的下劃線 */
}

@media (max-width: 600px) {
  .navbar-container {
    flex-direction: column; /* 在小屏幕上垂直排列 */
    align-items: flex-start; /* 左對齊 */
  }

  .navbar-menu {
    flex-direction: column; /* 將導航項目垂直排列 */
    width: 100%; /* 確保導航項目寬度為 100% */
  }

  .navbar-menu li {
    margin: 5px 0; /* 項目之間的間距 */
  }
}
</style>

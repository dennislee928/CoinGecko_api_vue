<template>
  <nav>
    <ul>
      <li><router-link to="/market-overview">Market Overview</router-link></li>
      <li><router-link to="/coins">Coins</router-link></li>
      <!-- 其他導航鏈接 -->
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar' // 修改這裡以符合多字元元件名稱規則
}
</script>

<style scoped>
nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 10px;
}
</style>

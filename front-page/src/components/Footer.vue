<template>
  <footer>
    <div class="footer-container">
      <p>聯絡我:</p>
      <ul>
        <li>
          <a href="mailto:pcleegood@gmail.com">
            <i class="fas fa-envelope"></i> pcleegood@gmail.com
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/pei-chen-lee-4a3a352a2/" target="_blank">
            <i class="fab fa-linkedin"></i> LinkedIn
          </a>
        </li>
        <li>
          <a href="https://linktr.ee/DennisLLee" target="_blank">
            <i class="fas fa-link"></i> Linktree
          </a>
        </li>
        <li>
          <a href="https://www.cakeresume.com/pf-frog" target="_blank">
            <i class="fas fa-file-alt"></i> CakeResume
          </a>
        </li>
        <li>
          <a href="https://github.com/dennislee928" target="_blank">
            <i class="fab fa-github"></i> GitHub
          </a>
        </li>
        <li>
          <a href="https://next-js-portfolio-pi-ten.vercel.app/" target="_blank">
            <i class="fas fa-briefcase"></i> Portfolio Website
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter' // 將組件名稱更改為多字名稱
}
</script>

<style scoped>
.footer-container {
  padding: 20px;
  text-align: center;
  background-color: #f8f8f8; /* 可根據需要調整背景顏色 */
}

.footer-container ul {
  list-style-type: none;
  padding: 0;
}

.footer-container li {
  margin: 10px 0;
}

.footer-container a {
  text-decoration: none;
  color: #333; /* 可根據需要調整文字顏色 */
}

.footer-container a:hover {
  text-decoration: underline;
}
</style>

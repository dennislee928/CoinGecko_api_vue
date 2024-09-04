<template>
  <Navbar />
  <div class="container">
    <h1>{{ coinData.name }} ({{ coinData.symbol }})</h1>
    <img :src="coinData.logo" alt="Logo" class="coin-logo" />
    <p>{{ coinData.description }}</p>
    <table class="coin-table">
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in coinData" :key="key">
          <td>{{ key }}</td>
          <td>{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
//import Navbar from '../components/Navbar.vue'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      coinData: null as any
    }
  },
  created() {
    fetch(`https://api.coinpaprika.com/v1/coins/${this.id}`)
      .then((response) => response.json())
      .then((data) => {
        this.coinData = data
      })
  }
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: #333; /* 改變文字顏色 */
}

.coin-logo {
  width: 100px;
  height: 100px;
  margin: 20px 0;
}

.coin-table {
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;
  background-color: #fff; /* 改變背景顏色 */
}

.coin-table th,
.coin-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

.coin-table th {
  background-color: #f4f4f4;
  color: #333; /* 改變文字顏色 */
}

.coin-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.coin-table tr:hover {
  background-color: #f1f1f1;
}

.whitepaper-thumbnail {
  width: 50px;
  height: 50px;
}

@media (max-width: 600px) {
  .container {
    padding: 10px;
  }

  .coin-table {
    font-size: 14px;
  }

  .coin-table th,
  .coin-table td {
    padding: 8px 10px;
  }

  .coin-logo {
    width: 80px;
    height: 80px;
  }

  .whitepaper-thumbnail {
    width: 40px;
    height: 40px;
  }

  .coin-table th,
  .coin-table td {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }

  .coin-table th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  .coin-table td {
    border-top: none;
    border-left: none;
    border-right: none;
    padding-left: 0;
  }

  .coin-table tr {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
}
</style>

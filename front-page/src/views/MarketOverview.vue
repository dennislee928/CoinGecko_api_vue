<template>
  <div class="container">
    <NavbarItem />
    <h1>Market Overview</h1>
    <router-link to="/coins">
      <h2>See all coins list</h2>
    </router-link>
    <table class="market-table">
      <tr>
        <th>Market Cap (USD)</th>
        <td>{{ marketData.market_cap_usd }}</td>
      </tr>
      <tr>
        <th>24h Volume (USD)</th>
        <td>{{ marketData.volume_24h_usd }}</td>
      </tr>
      <tr>
        <th>Bitcoin Dominance (%)</th>
        <td>{{ marketData.bitcoin_dominance_percentage }}</td>
      </tr>
      <tr>
        <th>Cryptocurrencies Number</th>
        <td>{{ marketData.cryptocurrencies_number }}</td>
      </tr>
      <tr>
        <th>Market Cap ATH Value</th>
        <td>{{ marketData.market_cap_ath_value }}</td>
      </tr>
      <tr>
        <th>Market Cap ATH Date</th>
        <td>{{ new Date(marketData.market_cap_ath_date).toLocaleString() }}</td>
      </tr>
      <tr>
        <th>24h Volume ATH Value</th>
        <td>{{ marketData.volume_24h_ath_value }}</td>
      </tr>
      <tr>
        <th>24h Volume ATH Date</th>
        <td>{{ new Date(marketData.volume_24h_ath_date).toLocaleString() }}</td>
      </tr>
      <tr>
        <th>24h Volume % from ATH</th>
        <td>{{ marketData.volume_24h_percent_from_ath }}</td>
      </tr>
      <tr>
        <th>24h Volume % to ATH</th>
        <td>{{ marketData.volume_24h_percent_to_ath }}</td>
      </tr>
      <tr>
        <th>Market Cap Change 24h (%)</th>
        <td>{{ marketData.market_cap_change_24h }}</td>
      </tr>
      <tr>
        <th>24h Volume Change 24h (%)</th>
        <td>{{ marketData.volume_24h_change_24h }}</td>
      </tr>
      <tr>
        <th>Last Updated</th>
        <td>{{ new Date(marketData.last_updated * 1000).toLocaleString() }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      marketData: null as any
    }
  },
  created() {
    fetch('https://api.coinpaprika.com/v1/global')
      .then((response) => response.json())
      .then((data) => {
        this.marketData = data
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
}

.market-table {
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;
  color: #333; /* 確保文字顏色清晰 */
}

.market-table th,
.market-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

.market-table th {
  background-color: #4caf50; /* 深色背景 */
  color: #fff; /* 白色文字 */
}

.market-table tr:nth-child(even) {
  background-color: #f2f2f2; /* 淺色背景 */
}

.market-table tr:hover {
  background-color: #ddd; /* 懸停時的背景顏色 */
}

@media (max-width: 600px) {
  .container {
    padding: 10px;
  }

  .market-table {
    font-size: 16px; /* 調整字體大小 */
  }

  .market-table th,
  .market-table td {
    padding: 10px; /* 調整內邊距 */
    word-wrap: break-word; /* 允許文字換行 */
    color: #333; /* 確保文字顏色清晰 */
  }

  .market-table th,
  .market-table td {
    display: block; /* 使表格在小屏幕上垂直顯示 */
    width: 100%;
    box-sizing: border-box;
  }

  .market-table tr {
    margin-bottom: 10px; /* 增加行間距 */
  }
}
</style>

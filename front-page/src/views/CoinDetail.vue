<template>
  <NavbarItem />
  <div class="container">
    <h1>{{ coinData.name }} ({{ coinData.symbol }})</h1>
    <img :src="coinData.logo" alt="Logo" class="coin-logo" />
    <p>{{ coinData.description }}</p>
    <table class="coin-table">
      <tr>
        <th>ID</th>
        <td>{{ coinData.id }}</td>
      </tr>
      <tr>
        <th>Rank</th>
        <td>{{ coinData.rank }}</td>
      </tr>
      <tr>
        <th>Type</th>
        <td>{{ coinData.type }}</td>
      </tr>
      <tr>
        <th>Is New</th>
        <td>{{ coinData.is_new }}</td>
      </tr>
      <tr>
        <th>Is Active</th>
        <td>{{ coinData.is_active }}</td>
      </tr>
      <tr>
        <th>Started At</th>
        <td>{{ new Date(coinData.started_at).toLocaleString() }}</td>
      </tr>
      <tr>
        <th>Development Status</th>
        <td>{{ coinData.development_status }}</td>
      </tr>
      <tr>
        <th>Hardware Wallet</th>
        <td>{{ coinData.hardware_wallet }}</td>
      </tr>
      <tr>
        <th>Proof Type</th>
        <td>{{ coinData.proof_type }}</td>
      </tr>
      <tr>
        <th>Org Structure</th>
        <td>{{ coinData.org_structure }}</td>
      </tr>
      <tr>
        <th>Hash Algorithm</th>
        <td>{{ coinData.hash_algorithm }}</td>
      </tr>
      <tr>
        <th>Tags</th>
        <td>
          <ul>
            <li v-for="tag in coinData.tags" :key="tag.id">{{ tag.name }}</li>
          </ul>
        </td>
      </tr>
      <tr>
        <th>Team</th>
        <td>
          <ul>
            <li v-for="member in coinData.team" :key="member.id">
              {{ member.name }} - {{ member.position }}
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <th>Links</th>
        <td>
          <ul>
            <li v-for="(link, type) in coinData.links" :key="type">
              <strong>{{ type }}:</strong>
              <ul>
                <li v-for="url in link" :key="url">
                  <a :href="url" target="_blank">{{ url }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <th>Whitepaper</th>
        <td>
          <a :href="coinData.whitepaper.link" target="_blank">
            <img
              :src="coinData.whitepaper.thumbnail"
              alt="Whitepaper Thumbnail"
              class="whitepaper-thumbnail"
            />
          </a>
        </td>
      </tr>
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
  color: #333; /* 確保文字顏色清晰 */
}

.coin-table th,
.coin-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

.coin-table th {
  background-color: #f4f4f4;
  color: #000; /* 確保標題文字顏色清晰 */
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
    font-size: 16px; /* 調整字體大小 */
  }

  .coin-table th,
  .coin-table td {
    padding: 10px; /* 調整內邊距 */
    word-wrap: break-word;
  }

  .coin-logo {
    width: 80px;
    height: 80px;
  }

  .whitepaper-thumbnail {
    width: 40px;
    height: 40px;
  }
}
</style>

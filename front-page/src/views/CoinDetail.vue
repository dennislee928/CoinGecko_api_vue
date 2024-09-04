<template>
  <div>
    <h1>Coin Detail</h1>
    <pre>{{ coinData }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      coinData: null as any
    }
  },
  created() {
    fetch('https://api.coinpaprika.com/v1/coins/btc-bitcoin')
      .then((response) => response.json())
      .then((data) => {
        this.coinData = data
      })
  }
})
</script>

<template>
  <div>
    <h1>Market Overview</h1>
    <pre>{{ marketData }}</pre>
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

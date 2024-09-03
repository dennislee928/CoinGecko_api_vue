<template>
  <div>
    <h1>Market Overview</h1>
    <pre>{{ marketData }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      marketData: null
    }
  },
  created() {
    fetch('https://api.coinpaprika.com/v1/global')
      .then((response) => response.json())
      .then((data) => {
        this.marketData = data
      })
  }
}
</script>

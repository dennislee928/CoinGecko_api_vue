<template>
  <div>
    <h1>{{ coin.name }}</h1>
    <pre>{{ coin }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coin: null
    }
  },
  created() {
    const coinId = this.$route.params.id
    fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      .then((response) => response.json())
      .then((data) => {
        this.coin = data
      })
  }
}
</script>

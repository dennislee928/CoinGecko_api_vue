<template>
  <div id="app">
    <router-view />
  </div>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style>
#app {
  width: 100%;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
</style>

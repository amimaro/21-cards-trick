<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    try {
      this.$store.dispatch('startTrick')
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style>
body,
html {
  overflow: hidden;
}
* {
  padding: 0px;
  margin: 0px;
}
</style>

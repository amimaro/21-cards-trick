<template>
  <div id="app">
    <Modal v-if="showModal" @close="showModal = false"/>
    <router-view/>
  </div>
</template>

<script>
import Modal from '@/components/Modal/Index'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    Modal
  },
  computed: {
    ...mapState(['showModal'])
  },
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
  font-family: Arial, Helvetica, sans-serif;
}
* {
  padding: 0px;
  margin: 0px;
}
</style>

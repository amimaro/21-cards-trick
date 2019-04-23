<template>
  <div id="app">
    <Loading v-if="loading" />
    <Modal v-if="showModal" @close="showModal = false"/>
    <router-view/>
  </div>
</template>

<script>
import Modal from '@/components/Modal/Index'
import Loading from '@/components/Loading'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    Modal,
    Loading
  },
  computed: {
    ...mapState(['showModal', 'loading'])
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
  background-color: rgb(94, 94, 94);
}
* {
  padding: 0px;
  margin: 0px;
}
</style>

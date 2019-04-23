<template>
  <div class="modal-container">
    <div class="modal-header">
      <h3>Found it!</h3>
    </div>
    <div class="modal-body">
      <div id="card">
        <img :src="cards[10].images.png" :alt="`card-${cards[10].value}`">
      </div>
      <p><small>If it's not, maybe there is something strange with the Force. Please, try again.</small></p>
    </div>
    <div class="modal-footer">
      <div align="center">
        <button class="btn" @click="restartTrick()">Try Again</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'ModalWelcome',
  computed: {
    ...mapState(['cards'])
  },
  methods: {
    ...mapActions(['restartTrick'])
  }
}
</script>

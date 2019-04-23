<template>
  <div class="modal-container">
    <div class="modal-header"></div>
    <div class="modal-body">
      <p>This is yout card?</p>
      <div id="card">
        <img :src="cards[10].images.png" :alt="`card-${cards[10].value}`">
      </div>
    </div>
    <div class="modal-footer">
      <div align="center">
        <button class="btn" @click="restartTrick()">Yes, try again</button>
        <button class="btn" @click="INCREMENT_ROUND()">No</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'ModalWelcome',
  computed: {
    ...mapState(['cards'])
  },
  methods: {
    ...mapActions(['toggleModal', 'restartTrick']),
    ...mapMutations(['INCREMENT_ROUND'])
  }
}
</script>

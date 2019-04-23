<template>
  <div class="modal-container">
    <div class="modal-header">
      <h3>Greetings!</h3>
    </div>
    <div class="modal-body">
      <p>This is a 21 cards magic trick.</p>
      <p>Today, I'm gonna read your mind.</p>
      <p>With my powers I'll pop the card that you thought.</p>
      <p>Please, choose a card and select the pile which your card is.</p>
    </div>
    <div class="modal-footer">
      <div align="center">
        <button class="btn" @click="toggleModal()">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ModalWelcome',
  methods: {
    ...mapActions(['toggleModal'])
  }
}
</script>

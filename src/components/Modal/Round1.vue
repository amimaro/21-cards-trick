<template>
  <div class="modal-container">
    <div class="modal-header">
    </div>
    <div class="modal-body">
      <p>I see something...</p>
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

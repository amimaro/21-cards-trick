<template>
  <div class="modal-container">
    <div class="modal-header"></div>
    <div class="modal-body">
      <p>Are you sure?</p>
    </div>
    <div class="modal-footer">
      <div align="center">
        <div align="center">
          <button class="btn" @click="toggleModal()">Yes</button>
          <button class="btn" @click="toggleModal()">No</button>
        </div>
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

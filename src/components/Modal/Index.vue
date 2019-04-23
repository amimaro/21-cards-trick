<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
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
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Modal',
  methods: {
    ...mapActions(['toggleModal'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  padding-bottom: 3%;
}
.btn {
  background-color: #44c767;
  -moz-border-radius: 28px;
  -webkit-border-radius: 28px;
  border-radius: 28px;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  padding: 16px 31px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;
}
.btn:hover {
  background-color: #5cbf2a;
}
.btn:active {
  position: relative;
  top: 1px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 50vw;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-body {
  margin: 20px 0;
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

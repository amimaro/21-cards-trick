<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <ModalWelcome v-if="round === 0"/>
        <ModalRound1 v-if="round === 1"/>
        <ModalRound2 v-if="round === 2"/>
        <ModalSure v-if="round === 3"/>
        <ModalFound v-if="round === 4"/>
      </div>
    </div>
  </transition>
</template>

<script>
import ModalWelcome from '@/components/Modal/Welcome'
import ModalRound1 from '@/components/Modal/Round1'
import ModalRound2 from '@/components/Modal/Round2'
import ModalSure from '@/components/Modal/Sure'
import ModalFound from '@/components/Modal/Found'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Modal',
  computed: {
    ...mapState(['round'])
  },
  components: {
    ModalWelcome,
    ModalRound1,
    ModalRound2,
    ModalSure,
    ModalFound
  },
  methods: {
    ...mapActions(['toggleModal'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#card {
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
}
#card img {
  width: 100px;
}
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
  margin: 10px;
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
  padding: 10px 15px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
.modal-header {
  margin-bottom: 20px;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
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

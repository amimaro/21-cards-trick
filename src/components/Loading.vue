<template>
  <div class="mask">
    <div class="loading">
      <div class="spinner"></div>
    </div>
  </div>
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
.loading {
  position: fixed;
  z-index: 11;
  height: 10em;
  width: 8em;
  overflow: visible;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.mask {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.spinner {
  margin: 50px;
  height: 28px;
  width: 28px;
  animation: rotate 0.8s infinite linear;
  border: 8px solid #fff;
  border-right-color: transparent;
  border-radius: 50%;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

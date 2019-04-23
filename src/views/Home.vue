<template>
  <div class="home">
    <div class="grid-container">
      <div class="grid-item" v-for="(card, index) in cards" :key="index">
        <img
          class="card"
          :src="card.images.png"
          :alt="`card-${card.value}`"
          @click="selectPile($event)"
          :pile="getPileNumber(index)"
          @mouseover="handleMouseover($event)"
          @mouseleave="handleMouseleave($event)"
          :class="{ active: getPileNumber(index) === 0 ? hoverPile0 : getPileNumber(index) === 1 ? hoverPile1 : hoverPile2}"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  computed: {
    ...mapState(['cards'])
  },
  data () {
    return {
      hoverPile0: false,
      hoverPile1: false,
      hoverPile2: false
    }
  },
  methods: {
    ...mapActions(['playRound']),
    getPileNumber (index) {
      return index <= 6 ? 0 : index > 6 && index <= 13 ? 1 : 2
    },
    selectPile (e) {
      const pileIndex = parseInt(e.target.getAttribute('pile'))
      this.playRound(pileIndex)
    },
    handleMouseover (e) {
      const pile = parseInt(e.target.getAttribute('pile'))
      if (pile === 0) this.hoverPile0 = true
      else if (pile === 1) this.hoverPile1 = true
      else if (pile === 2) this.hoverPile2 = true
    },
    handleMouseleave (e) {
      const pile = parseInt(e.target.getAttribute('pile'))
      if (pile === 0) this.hoverPile0 = false
      else if (pile === 1) this.hoverPile1 = false
      else if (pile === 2) this.hoverPile2 = false
    }
  }
}
</script>

<style>
.home {
  display: table;
  margin: 0 auto;
  padding: 2% 0% 0% 2%;
}
.card {
  width: 99%;
  transition: all 0.2s ease-in-out;
}
.active {
  transform: scale(1.1);
  -webkit-box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.75);
}
.grid-item {
  text-align: center;
}
.grid-container {
  display: grid;
  width: 70vw;
  height: 100vh;
  row-gap: 2%;
  grid-auto-flow: row;
  grid-template-columns: repeat(7, 10vw);
  grid-template-rows: repeat(3, 30vh);
  grid-template-areas: repeat(3, ". . . . . . .");
}
@media all and (max-width: 480px) and (min-height: 480px) {
  .grid-container {
    width: 100vw;
    column-gap: 2%;
    grid-auto-flow: column;
    grid-template-columns: repeat(3, 30%);
    grid-template-rows: repeat(7, 10%);
    grid-template-areas: repeat(7, ". . .");
  }
}
</style>

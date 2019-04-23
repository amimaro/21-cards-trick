<template>
  <div class="home">
    <div class="grid-container">
      <div class="grid-item" v-for="(card, index) in cards" :key="index">
        <img class="card" :src="card.images.png" :alt="`card-${card.value}`">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'home',
  computed: {
    ...mapState(['cards'])
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

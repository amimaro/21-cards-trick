<template>
  <div class="fab">{{label}}</div>
</template>

<script>
export default {
  name: 'FabButton',
  props: {
    label: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fab:hover {
  transform: scale(1.05);
}

.fab {
  z-index: 1000;
  position: fixed;
  cursor: pointer;
  width: 5vw;
  height: 10vh;
  right: 5vw;
  bottom: 5vh;
  font-size: 5vw;
  color: white;
  text-align: center;
  line-height: 4.5vw;
  border-radius: 50%;
  background-color: royalblue;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 5px 10px 0 #777;
}

@media all and (max-width: 480px) and (min-height: 480px) {
  .fab {
    width: 12vw;
    height: 8vh;
    font-size: 8vh;
    line-height: 7vh;
  }
}
</style>

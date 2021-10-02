<template>
  <div id="app">
    <render-canvas style="width: 100%; height: 600px;" />
  </div>
</template>

<script>
import Vue from 'vue'
import RenderCanvas from '../components/RenderCanvas.vue';

export default Vue.extend({
  name: 'app',
  components: {
    RenderCanvas
  }
});
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  position: relative;
  height: 100vh;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
}
</style>

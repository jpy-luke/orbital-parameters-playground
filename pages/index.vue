<template>
  <div id="app">
    <label>{{ fps }}</label>
    <render-canvas @fps="fpsReceived" style="width: 100%; height: 600px;"/>
  </div>
</template>

<script>
import Vue from 'vue'
import RenderCanvas from '../components/RenderCanvas.vue';

export default Vue.extend({
  name: 'app',
  components: {
    RenderCanvas
  },
  data() {
    return {
      fps: 0
    };
  },
  methods: {
    fpsReceived(fps) {
      this.fps = fps;
    }
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

<template>
  <div id="app">
    <label>emitted fps {{ callbackFps }}</label><br/>
    <label>polled fps {{ polledFps }}</label>
    <render-canvas @callbackFps="callbackFpsReceived" @polledFps="polledFpsReceived"
                   style="width: 100%; height: 600px;"/>
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
      callbackFps: 0,
      polledFps: 0
    };
  },
  methods: {
    callbackFpsReceived(fps) {
      this.callbackFps = fps;
    },
    polledFpsReceived(fps) {
      this.polledFps = fps;
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

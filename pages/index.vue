<template>
  <div id="app">
    <label>emitted fps {{ callbackFps }}</label><br/>
    <button @click="moveCube">Move Cube</button>
    <render-canvas @callbackFps="callbackFpsReceived" :position="cubePosition"
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
      cubePosition: {},
      offset: 0,
      x: 0,
      y: 0,
      z: 0
    };
  },
  methods: {
    callbackFpsReceived(fps) {
      this.callbackFps = fps;
    },
    moveCube() {
      this.getNextPosition();
      this.moveCubeTheRightWay()
    },
    moveCubeTheRightWay() {
      this.cubePosition = {x: 2, y: this.y, z: this.z}
    },
    getNextPosition() {
      this.offset += 0.5;
      this.x = 0;
      this.y = 0 + this.offset;
      this.z = 0;
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

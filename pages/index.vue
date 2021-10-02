<template>
  <div id="app">
    <label>emitted fps {{ callbackFps }}</label><br/>
    <button @click="animate">Animate</button>
    <button @click="stop">Stop</button>
    <render-canvas @callbackFps="callbackFpsReceived" :position="position"
                   style="width: 100%; height: 600px;"/>
  </div>
</template>

<script>
import Vue from 'vue'
import RenderCanvas from '../components/RenderCanvas.vue';
import utils from 'influence-utils'

export default Vue.extend({
  name: 'app',
  components: {
    RenderCanvas
  },
  data() {
    return {
      interval: null,
      callbackFps: 0,
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      day: 0,
      orbit: new utils.KeplerianOrbit({
        a: 2.447,
        e: 0.269,
        i: 0.04974188368183839,
        o: 2.1395991300198487,
        w: 3.312111321509639,
        m: 0.9262462340333908
      })
    };
  },
  methods: {
    callbackFpsReceived(fps) {
      this.callbackFps = fps;
    },
    animate() {
      const interval = setInterval(() => {
        this.position = this.orbit.getPositionAtTime(this.day);
        this.day += 25
      }, 40)
      this.interval = interval;
    },
    stop() {
      if (this.interval) {
        clearInterval(this.interval)
      }
    }

  },
  mounted() {

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

button {
  border-color: black;
  border-width: 2px 2px 2px 2px;
}
</style>

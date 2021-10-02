<template>
  <div id="app">
    <label>emitted fps {{ callbackFps }}</label><br/>
    <button @click="animate">Animate</button>
    <button @click="stop">Stop</button>
    <table>
      <thead>
      <tr>
        <th>Semi-major axis</th>
        <th>Eccentricity</th>
        <th>Inclination (rad)</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><input @change="setSemimajorAxis" :placeholder="orbitalElements.a" type="number" step="0.1"></td>
        <td><input @change="setEccentricity" :placeholder="orbitalElements.e" type="number" step="0.1"></td>
        <td><input @change="setInclination" :placeholder="orbitalElements.i" type="number" step="0.1"></td>
      </tr>
      </tbody>
    </table>
    <table>
      <thead>
      <tr>
        <th>Ascending node (rad)</th>
        <th>Argument of periapsis (rad)</th>
        <th>Mean anomaly at epoch (rad)</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><input @change="setLongitudeOfAscendingNode" :placeholder="orbitalElements.o" type="number" step="0.1"></td>
        <td><input @change="setArgumentOfPeriapsis" :placeholder="orbitalElements.w" type="number" step="0.1"></td>
        <td><input @change="setMeanAnomalyAtEpoch" :placeholder="orbitalElements.m" type="number" step="0.1"></td>
      </tr>
      </tbody>
    </table>
    <render-canvas @callbackFps="callbackFpsReceived" :position="position"
                   style="width: 100%; height: 400px;"/>
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
      orbitalElements: {
        a: 2.447,
        e: 0.269,
        i: 0.04974188368183839,
        o: 2.1395991300198487,
        w: 3.312111321509639,
        m: 0.9262462340333908
      }
    };
  },
  methods: {
    setSemimajorAxis(event) {
      this.orbitalElements.a = Number(event.target.value)
    },
    setEccentricity(event) {
      this.orbitalElements.e = Number(event.target.value)
      this.refresh();
    },
    setInclination(event) {
      this.orbitalElements.i = Number(event.target.value)
      this.refresh();
    },
    setLongitudeOfAscendingNode(event) {
      this.orbitalElements.o = Number(event.target.value)
      this.refresh();
    },
    setArgumentOfPeriapsis(event) {
      this.orbitalElements.w = Number(event.target.value)
      this.refresh();
    },
    setMeanAnomalyAtEpoch(event) {
      this.orbitalElements.m = Number(event.target.value)
      this.refresh();
    },
    callbackFpsReceived(fps) {
      this.callbackFps = fps;
    },
    animate() {
      const interval = setInterval(() => {
        this.refresh();
        this.day += 25
      }, 40)
      this.interval = interval;
    },
    stop() {
      if (this.interval) {
        clearInterval(this.interval)
      }
    },
    refresh() {
      const orbit = new utils.KeplerianOrbit(this.orbitalElements)
      this.position = orbit.getPositionAtTime(this.day)
    }

  },
  mounted() {
    this.refresh();
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

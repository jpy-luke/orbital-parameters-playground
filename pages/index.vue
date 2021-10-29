<template>
  <div id="app">
    <button @click="animate">Animate</button>
    <button @click="stop">Stop</button>
    <table>
      <thead>
      <tr>
        <th>Semi-major axis</th>
        <th>Eccentricity</th>
        <th>Inclination (rad)</th>
        <th>Simulation interval (ms)</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><input @change="setSemimajorAxis" :placeholder="orbitalElements.a" type="number" step="0.1"></td>
        <td><input @change="setEccentricity" :placeholder="orbitalElements.e" type="number" step="0.1"></td>
        <td><input @change="setInclination" :placeholder="orbitalElements.i" type="number" step="0.1"></td>
        <td><input @change="setSimulationInterval" :placeholder="simulationInterval" type="number" step="10"></td>
      </tr>
      </tbody>
    </table>
    <table>
      <thead>
      <tr>
        <th>Ascending node (rad)</th>
        <th>Argument of periapsis (rad)</th>
        <th>Mean anomaly at epoch (rad)</th>
        <th>Simulation days per interval</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><input @change="setLongitudeOfAscendingNode" :placeholder="orbitalElements.o" type="number" step="0.1"></td>
        <td><input @change="setArgumentOfPeriapsis" :placeholder="orbitalElements.w" type="number" step="0.1"></td>
        <td><input @change="setMeanAnomalyAtEpoch" :placeholder="orbitalElements.m" type="number" step="0.1"></td>
        <td><input @change="setDaysPerInterval" :placeholder="daysPerInterval" type="number" step="10"></td>
      </tr>
      </tbody>
    </table>
    <p>Use inputs above to experiment with orbital parameters. You can adjust them on the go even when Animate is active.</p>
    <p>Click and drag with mouse to move camera. Use wheel to zoom in. This probably won't work very well on mobile browser.</p>
    <render-canvas :position="position" :path="orbitalPath"/>
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
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      day: 0,
      simulationInterval: 40,
      daysPerInterval: 25,
      orbitalElements: {
        a: 2.447,
        e: 0.269,
        i: 0.14974188368183839,
        o: 2.1395991300198487,
        w: 3.312111321509639,
        m: 0.9262462340333908
      },
      orbitalPath: []
    };
  },
  methods: {
    setSemimajorAxis(event) {
      let value = Number(event.target.value)
      if(value < 0.1) {
        value = 0.1;
      }
      this.orbitalElements.a = value;
      this.refreshAsteroidPosition();
      this.refreshOrbitalPath();
    },
    setEccentricity(event) {
      let value = Number(event.target.value)
      if(value > 0.99) {
        value = 0.99;
      }
      if(value < -0.99) {
        value = -0.99;
      }
      this.orbitalElements.e = value
      this.refreshAsteroidPosition();
      this.refreshOrbitalPath();
    },
    setInclination(event) {
      this.orbitalElements.i = Number(event.target.value)
      this.refreshAsteroidPosition();
      this.refreshOrbitalPath();
    },
    setLongitudeOfAscendingNode(event) {
      this.orbitalElements.o = Number(event.target.value)
      this.refreshAsteroidPosition();
      this.refreshOrbitalPath();
    },
    setArgumentOfPeriapsis(event) {
      this.orbitalElements.w = Number(event.target.value)
      this.refreshAsteroidPosition();
      this.refreshOrbitalPath();
    },
    setMeanAnomalyAtEpoch(event) {
      this.orbitalElements.m = Number(event.target.value)
      this.refreshAsteroidPosition();
      this.refreshOrbitalPath();
    },
    setSimulationInterval(event) {
      this.simulationInterval = Number(event.target.value)
      if (this.interval) {
        this.stop();
        this.animate();
      }
    },
    setDaysPerInterval(event) {
      this.daysPerInterval = Number(event.target.value)
    },
    animate() {
      if(!this.interval) {
        const interval = setInterval(() => {
          this.refreshAsteroidPosition();
          this.day += this.daysPerInterval;
        }, this.simulationInterval);
        this.interval = interval;
      }
    },
    stop() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
    },
    refreshAsteroidPosition() {
      const orbit = new utils.KeplerianOrbit(this.orbitalElements);
      this.position = orbit.getPositionAtTime(this.day);
    },
    refreshOrbitalPath() {
      const orbit = new utils.KeplerianOrbit(this.orbitalElements);
      const positions = orbit.getSmoothOrbit(100);
      this.orbitalPath = positions;
    }

  },
  mounted() {
    this.refreshAsteroidPosition();
    this.refreshOrbitalPath();
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

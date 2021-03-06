<template>
  <div id="app">
    <p>You can use this application to experiment how Keplerian orbit parameters affect orbit of the Red planet circling the Blue sun.</p>
    <p>Use inputs below to experiment with orbital parameters. You can adjust them with mouse wheel or keyboard input.</p>
    <p>Click and drag the view screen with mouse to move the camera. Use wheel to zoom in. This probably won't work very well on mobile browser.</p>
    <p>Click the Animate button to start or stop the simulation.</p>
    <hr>
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
        <td><input @change="setSemimajorAxis" :value="orbitalElements.a" type="number" step="0.1"></td>
        <td><input @change="setEccentricity" :value="orbitalElements.e" type="number" step="0.1"></td>
        <td><input @change="setInclination" :value="orbitalElements.i" type="number" step="0.1"></td>
        <td><input @change="setSimulationInterval" :value="simulationInterval" type="number" step="10"></td>
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
        <td><input @change="setLongitudeOfAscendingNode" :value="orbitalElements.o" type="number" step="0.1"></td>
        <td><input @change="setArgumentOfPeriapsis" :value="orbitalElements.w" type="number" step="0.1"></td>
        <td><input @change="setMeanAnomalyAtEpoch" :value="orbitalElements.m" type="number" step="0.1"></td>
        <td><input @change="setDaysPerInterval" :value="daysPerInterval" type="number" step="10"></td>
      </tr>
      </tbody>
    </table>
    <hr>
    <button @click="toggleAnimate" v-bind:style="{'background-color': buttonColor}">Animate</button>
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
        a: 2.4,
        e: 0.2,
        i: 0.4,
        o: 2.1,
        w: 3.3,
        m: 0.9
      },
      orbitalPath: [],
      buttonColor: "#0f0"
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
        this.stopAnimation();
        this.startAnimation();
      }
    },
    setDaysPerInterval(event) {
      this.daysPerInterval = Number(event.target.value)
    },
    toggleAnimate() {
      if (!!this.interval) {
        this.stopAnimation();
      }
      else if (!this.interval) {
        this.startAnimation();
      }
    },
    stopAnimation() {
      clearInterval(this.interval)
      this.interval = null
      this.buttonColor = "#0f0"
    },
    startAnimation() {
      const interval = setInterval(() => {
        this.refreshAsteroidPosition();
        this.day += this.daysPerInterval;
      }, this.simulationInterval);
      this.interval = interval;
      this.buttonColor = "#f00"
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

canvas {
  width: 60%;
}
</style>

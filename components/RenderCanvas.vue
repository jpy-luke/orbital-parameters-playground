<template>
  <div>
    <canvas ref="render-canvas" width="500" height="500"/>
  </div>
</template>

<script>
import {createScene} from "../scenes/MainScene";

export default {
  name: "RenderCanvas",

  data() {
    return {
      scene: null,
      engine: null,
      interval: null
    }
  },

  methods: {
    setupFpsPoller() {
      const interval = setInterval(() => {
        const fps = this.engine.getFps().toFixed();
        this.$emit("polledFps", fps);
      }, 1000)
      this.interval = interval;
    }
  },

  mounted() {
    const renderCanvas = this.$refs['render-canvas']
    const fpsCallback = (fps) => {
      this.$emit("callbackFps", fps)
    }
    if (renderCanvas) {
      const {engine, scene} = createScene(renderCanvas, fpsCallback);
      this.engine = engine;
      this.scene = scene;
      this.setupFpsPoller();
    }
  },

  unmounted() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
};
</script>

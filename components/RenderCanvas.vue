<template>
  <div>
    <canvas ref="render-canvas" width="1000" height="600"/>
  </div>
</template>

<script>
import sceneObject from "../scenes/MainScene";

export default {
  name: "RenderCanvas",

  props: {
    position: {
      type: Object,
      default() {
        return {x: 0, y: 0, z: 0};
      }
    }
  },

  watch: {
    position(val) {
      if (val) {
        sceneObject.setPosition("asteroid", val.x, val.y, val.z);
      }
    }
  },

  mounted() {
    const renderCanvas = this.$refs['render-canvas']
    const fpsCallback = (fps) => {
      this.$emit("callbackFps", fps)
    }
    if (renderCanvas) {
      sceneObject.createScene(renderCanvas, fpsCallback);
    }
  },

  unmounted() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
};
</script>

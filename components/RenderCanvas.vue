<template>
  <div>
    <canvas ref="render-canvas" width="500" height="500"/>
  </div>
</template>

<script>
import {createScene} from "../scenes/MainScene";

export default {
  name: "RenderCanvas",

  mounted() {
    const renderCanvas = this.$refs['render-canvas']
    const fpsCallback = (fps) => {
      this.$emit("fps", fps)
    }
    if (renderCanvas) {
      createScene(renderCanvas, fpsCallback);
    }
  },
};
</script>

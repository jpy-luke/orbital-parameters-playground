<template>
  <div>
    <canvas ref="render-canvas" width="500" height="500" />
  </div>
</template>

<script>
import { createScene } from "../scenes/MainScene";

export default {
  name: "RenderCanvas",

  mounted() {
    const renderCanvas = this.$refs['render-canvas']
    if (renderCanvas) {
      createScene(renderCanvas);
    }
  },
};
</script>

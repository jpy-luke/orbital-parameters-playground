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
    },
    path: {
      type: Array,
      default() {
        return []
      }
    }
  },

  watch: {
    position(val) {
      if (val) {
        sceneObject.setPosition("asteroid", val.x, val.y, val.z);
      }
    },
    path(val) {
      sceneObject.setOrbitalPath(val);
    }
  },

  mounted() {
    const renderCanvas = this.$refs['render-canvas']
    if (renderCanvas) {
      sceneObject.createScene(renderCanvas);
    }
  },
};
</script>

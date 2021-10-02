<template>
  <div class="render-canvas-wrapper">
    <canvas ref="render-canvas"></canvas>
    <slot></slot>
  </div>
</template>

<script>

import * as BABYLON from 'babylonjs';

const createScene = function (canvas, engine) {
  // Create a basic BJS Scene object
  const scene = new BABYLON.Scene(engine);
  // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
  const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
  // Target the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());
  // Attach the camera to the canvas
  camera.attachControl(canvas, false);
  // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
  const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
  // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
  const sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);
  // Move the sphere upward 1/2 of its height
  sphere.position.y = 1;
  // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
  const ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene, false);
  // Return the created scene
  return scene;
};

export default {
  data() {
    return {
      provider: {
        context: null,
      },
    };
  },

  provide() {
    return {
      provider: this.provider,
    };
  },

  mounted() {
    const canvas = this.$refs['render-canvas']
    const engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
    this.provider.context = canvas.getContext('3d');

    this.$refs['render-canvas'].width = this.$refs[
      'render-canvas'
      ].parentElement.clientWidth;
    this.$refs['render-canvas'].height = this.$refs[
      'render-canvas'
      ].parentElement.clientHeight;
    const scene = createScene(canvas, engine);
    engine.runRenderLoop(function(){
      scene.render();
    });
    window.addEventListener('resize', function(){
      engine.resize();
    });
  },
};
</script>

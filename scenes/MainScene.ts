import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  MeshBuilder,
  StandardMaterial,
  Color3,
  PointLight,
  ShadowGenerator
} from "babylonjs";

const sceneObject = {
  engine: null,
  scene: null,
  line: null,
  createScene: (canvas: HTMLCanvasElement, fpsCallback: Function) => {
    const engine = new Engine(canvas);
    const scene = new Scene(engine);
    sceneObject.engine = engine;
    sceneObject.scene = scene;

    const camera = new ArcRotateCamera("camera1", -3.14 / 2, 3.14 / 3 + 1, 20, new Vector3(0, 0, 0), scene);

    camera.attachControl(canvas, true);

    const light = new PointLight("light", new Vector3(0, 0, -10), scene);
    const shadowGenerator = new ShadowGenerator(1024, light);


    const adalia = MeshBuilder.CreateSphere("adalia", {}, scene);
    const materialAdalia = new StandardMaterial("adalia-material", scene);
    materialAdalia.diffuseColor = Color3.Blue();
    materialAdalia.specularColor = Color3.Blue();
    adalia.scaling = new Vector3(0.4, 0.4, 0.4)
    adalia.material = materialAdalia
    shadowGenerator.getShadowMap().renderList.push(adalia);

    const asteroid = MeshBuilder.CreateSphere("asteroid", {}, scene);
    const materialRed = new StandardMaterial("asteriod-material", scene);
    materialRed.diffuseColor = Color3.Red();
    materialRed.specularColor = Color3.Red();
    asteroid.material = materialRed;
    asteroid.scaling = new Vector3(0.2, 0.2, 0.2)
    shadowGenerator.getShadowMap().renderList.push(asteroid);

    const backgroundPlane = MeshBuilder.CreatePlane("background-plane", {size: 20}, scene);
    const materialBackgroundPlane = new StandardMaterial("plane-shaded", scene);
    materialBackgroundPlane.diffuseColor = Color3.Gray();
    materialBackgroundPlane.specularColor = Color3.Gray();
    materialBackgroundPlane.alpha = 0.2;
    backgroundPlane.material = materialBackgroundPlane;
    backgroundPlane.position.z = 2
    backgroundPlane.receiveShadows = true

    const referencePlane = MeshBuilder.CreatePlane("reference-plane", {size: 10}, scene);
    const materialReferencePlane = new StandardMaterial("plane-glass", scene);
    materialReferencePlane.diffuseColor = Color3.Black();
    materialReferencePlane.specularColor = Color3.Black();
    materialReferencePlane.alpha = 0.1
    referencePlane.material = materialReferencePlane;


    engine.runRenderLoop(() => {
      scene.render();
    });
  },
  setPosition: function (name: string, x: number, y: number, z: number) {
    const mesh = sceneObject.scene.getMeshByName(name);
    if (mesh) {
      mesh.position = new Vector3(x, y, z);
    }
  },
  setOrbitalPath: function (points: [Vector3]) {
    const vectors = points.map(point => new Vector3(point.x, point.y, point.z));
    if (sceneObject.line) {
      sceneObject.line.dispose();
    }
    const line = MeshBuilder.CreateDashedLines("orbital-path", {points: vectors}, sceneObject.scene);
    sceneObject.line = line;
  }
}

export default sceneObject;

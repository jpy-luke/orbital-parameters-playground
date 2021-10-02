import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  MeshBuilder,
  StandardMaterial,
  Color3,
  HemisphericLight
} from "babylonjs";

const sceneObject = {
  engine: null,
  scene: null,
  createScene: (canvas: HTMLCanvasElement, fpsCallback: Function) => {
    const engine = new Engine(canvas);
    const scene = new Scene(engine);
    sceneObject.engine = engine;
    sceneObject.scene = scene;

    const camera = new ArcRotateCamera("camera1", -3.14 / 2, 3.14 / 3 + 1, 20, new Vector3(0, 0, 0), scene);

    camera.attachControl(canvas, true);

    new HemisphericLight("light", new Vector3(0, 0, -100), scene);

    const adalia = MeshBuilder.CreateSphere("adalia", {}, scene);
    const materialAdalia = new StandardMaterial("adalia-material", scene);
    materialAdalia.ambientColor = Color3.White();
    adalia.scaling = new Vector3(0.5, 0.5, 0.5)

    const asteroid = MeshBuilder.CreateSphere("asteroid", {}, scene);
    const materialRed = new StandardMaterial("asteriod-material", scene);
    materialRed.diffuseColor = Color3.Red();
    asteroid.material = materialRed;
    asteroid.scaling = new Vector3(0.1, 0.1, 0.1)

    const plane = MeshBuilder.CreatePlane("reference-plane", {size: 20}, scene);
    const planeMaterial = new StandardMaterial("plane-glass", scene);
    planeMaterial.diffuseColor = Color3.Gray();
    planeMaterial.alpha = 0.2;
    plane.material = planeMaterial;

    engine.runRenderLoop(() => {
      scene.render();

      if (fpsCallback) {
        fpsCallback(engine.getFps().toFixed());
      }

    });
  },
  setPosition: function (name: string, x: number, y: number, z: number) {
    const mesh = sceneObject.scene.getMeshByName(name);
    if (mesh) {
      mesh.position = new Vector3(x, y, z);
    }
  }
}

export default sceneObject;

import {
  Engine,
  Scene,
  FreeCamera,
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

    const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);

    new HemisphericLight("light", Vector3.Up(), scene);

    const boxRed = MeshBuilder.CreateBox("box-red", {size: 2}, scene);
    const materialRed = new StandardMaterial("box-material", scene);
    materialRed.diffuseColor = Color3.Red();
    boxRed.material = materialRed;
    boxRed.position.x = -2;

    const boxBlue = MeshBuilder.CreateBox("box-yellow", {size: 1}, scene);
    const materialBlue = new StandardMaterial("box-blue-material", scene);
    materialBlue.diffuseColor = Color3.Blue();
    boxBlue.material = materialBlue;

    const boxGreen = MeshBuilder.CreateBox("box-green", {size: 1}, scene);
    const materialGreen = new StandardMaterial("box-Green-material", scene);
    materialGreen.diffuseColor = Color3.Green();
    boxGreen.material = materialGreen;
    boxGreen.position.x = 2;

    engine.runRenderLoop(() => {
      scene.render();

      boxGreen.rotation.y += 0.01;
      if (fpsCallback) {
        fpsCallback(engine.getFps().toFixed());
      }

    });
  },
  setPosition: function (name, x, y, z) {
    const mesh = sceneObject.scene.getMeshByName(name);
    if (mesh) {
      mesh.position = new Vector3(x, y, z);
    }
  }
}


export default sceneObject;

import {
  Engine,
  FreeCamera,
  HemisphericLight,
  Mesh,
  Scene,
  Vector3,
} from 'babylonjs';

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
const engine = new Engine(canvas, true);

const createScene = () => {
  const scene = new Scene(engine);
  const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, false);
  new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
  const sphere = Mesh.CreateSphere('sphere1', 16, 2, scene);
  sphere.position.y = 1;
  Mesh.CreateGround('ground1', 6, 6, 2, scene);

  return scene;
};
const scene = createScene();
engine.runRenderLoop(() => {
  scene.render();
});
window.addEventListener('resize', () => {
  engine.resize();
});

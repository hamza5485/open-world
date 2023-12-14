import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from 'babylonjs';

export class App {
  private readonly canvas: HTMLCanvasElement;
  private readonly engine: Engine;
  private readonly scene: Scene;

  constructor(canvasElementId: string) {
    this.canvas = document.getElementById(canvasElementId) as HTMLCanvasElement;
    this.engine = new Engine(this.canvas, true);
    this.scene = this.createScene();
  }

  private createScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new ArcRotateCamera(
      'camera1',
      0,
      1,
      0,
      new Vector3(0, 5, -10),
      scene
    );
    camera.setTarget(Vector3.Zero());
    camera.attachControl(this.canvas, false);
    new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
    const sphere = MeshBuilder.CreateSphere(
      'sphere1',
      { segments: 16, diameter: 2 },
      scene
    );
    sphere.position.y = 1;
    MeshBuilder.CreateGround(
      'ground1',
      { width: 6, height: 6, subdivisions: 10 },
      scene
    );

    return scene;
  }

  public run(): void {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
}

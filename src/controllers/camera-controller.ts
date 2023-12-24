import { ArcRotateCamera, Scene, Vector3 } from 'babylonjs';

export class CameraController {
  private camera: ArcRotateCamera;
  private scene: Scene;
  private canvas: HTMLCanvasElement;

  constructor(scene: Scene, canvas: HTMLCanvasElement) {
    this.scene = scene;
    this.canvas = canvas;
    this.camera = this.createCamera();
  }

  private createCamera(): ArcRotateCamera {
    const camera = new ArcRotateCamera(
      'thirdPersonCamera',
      -Math.PI / 2,
      Math.PI / 2,
      3,
      new Vector3(0, 1, 0),
      this.scene
    );

    camera.lowerRadiusLimit = 2.5;
    camera.upperRadiusLimit = 6;
    camera.wheelDeltaPercentage = 0.01;
    camera.upperBetaLimit = Math.PI / 2.3;
    camera.attachControl(this.canvas, true);

    return camera;
  }

  public getCamera(): ArcRotateCamera {
    return this.camera;
  }
}

import { Scene, HemisphericLight, Vector3 } from 'babylonjs';

export class LightingController {
  constructor(private scene: Scene) {
    this.setupLights();
  }

  private setupLights(): void {
    const ambientLight = new HemisphericLight(
      'ambientLight',
      new Vector3(0, 1, 0),
      this.scene
    );
    ambientLight.intensity = 0.7;
  }
}

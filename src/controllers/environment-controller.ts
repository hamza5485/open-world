import { Color3, Scene } from 'babylonjs';

export class EnvironmentController {
  constructor(private scene: Scene) {
    this.createEnvironment();
  }

  private createEnvironment(): void {
    const helper = this.scene.createDefaultEnvironment({
      enableGroundShadow: true,
      createSkybox: true,
      createGround: true,
    });
    helper?.setMainColor(Color3.Gray());
  }
}

import { Engine, Scene } from 'babylonjs';
import { Character, CharacterMovement } from './characters/character';
import { CameraController } from './controllers/camera-controller';
import { LightingController } from './controllers/lighting-controller';
import { EnvironmentController } from './controllers/environment-controller';
import { AppUtilities } from './utils/app-utilities';
import { InputController } from './controllers/input-controller';

export class App {
  private readonly canvas: HTMLCanvasElement;
  private readonly engine: Engine;
  private readonly scene: Scene;
  private cameraController: CameraController;
  private inputController: InputController;
  private character: Character;

  constructor(canvasElementId: string) {
    this.canvas = document.getElementById(canvasElementId) as HTMLCanvasElement;
    this.canvas.focus();
    this.engine = new Engine(this.canvas, true);
    this.scene = this.createScene();
    this.cameraController = new CameraController(this.scene, this.canvas);
    this.character = new Character(this.scene, this.cameraController);
    this.inputController = new InputController(this.scene);
    this.setupBeforeRender();
    new AppUtilities(this.engine);
  }

  private createScene(): Scene {
    BABYLON.Animation.AllowMatricesInterpolation = true;
    const scene = new Scene(this.engine);
    new LightingController(scene);
    new EnvironmentController(scene);
    return scene;
  }

  private setupBeforeRender(): void {
    this.scene.onBeforeRenderObservable.add(() => {
      if (this.character.getMesh()) {
        const isShiftPressed = this.inputController.isKeyPressed('Shift');
        const isMovingForward = this.inputController.isKeyPressed('w');
        const isMovingLeft = this.inputController.isKeyPressed('a');
        const isMovingRight = this.inputController.isKeyPressed('d');
        const isMovingBackward = this.inputController.isKeyPressed('s');

        if (isMovingForward && isShiftPressed) {
          this.character.move(CharacterMovement.Run);
        } else if (isMovingForward) {
          this.character.move(CharacterMovement.Walk);
        } else if (isMovingLeft) {
          this.character.move(CharacterMovement.Left);
        } else if (isMovingRight) {
          this.character.move(CharacterMovement.Right);
        } else if (isMovingBackward) {
          this.character.move(CharacterMovement.Backward);
        } else {
          this.character.move(CharacterMovement.Idle);
        }
      }
    });
  }

  public run(): void {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
}

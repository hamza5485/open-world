import {
  Scene,
  SceneLoader,
  AbstractMesh,
  AnimationRange,
  Animatable,
} from 'babylonjs';
import { CameraController } from '../controllers/camera-controller';

export enum CharacterMovement {
  Idle = 'Idle',
  Walk = 'Walk',
  Run = 'Run',
  Left = 'Left',
  Right = 'Right',
  Backward = 'Backward',
}

const MESH_BASE_PATH =
  process.env.NODE_ENV === 'production' ? '/open-world/meshes/' : '/meshes/';

export class Character {
  private mesh: AbstractMesh | undefined;
  private currentMovement: CharacterMovement | null = null;
  private animations: {
    [key in CharacterMovement]: AnimationRange | null;
  };
  private blendDuration = 0.3;
  private activeAnimations: Animatable[] = [];

  constructor(
    private scene: Scene,
    private cameraController: CameraController
  ) {
    this.animations = {
      Idle: null,
      Walk: null,
      Run: null,
      Left: null,
      Right: null,
      Backward: null,
    };
    this.setupCharacter();
  }

  private setupCharacter(): void {
    SceneLoader.ImportMesh(
      '',
      MESH_BASE_PATH,
      'dummy3.babylon',
      this.scene,
      (newMeshes, _, skeletons) => {
        const skeleton = skeletons[0];
        this.animations = {
          Idle: skeleton.getAnimationRange('YBot_Idle'),
          Walk: skeleton.getAnimationRange('YBot_Walk'),
          Run: skeleton.getAnimationRange('YBot_Run'),
          Left: skeleton.getAnimationRange('YBot_LeftStrafeWalk'),
          Right: skeleton.getAnimationRange('YBot_RightStrafeWalk'),
          Backward: skeleton.getAnimationRange('YBot_Walk'),
        };
        this.mesh = newMeshes[0];
        this.mesh.scaling.setAll(0.5);
        this.cameraController.getCamera().setTarget(this.mesh);
      }
    );
  }

  public getMesh(): AbstractMesh | undefined {
    return this.mesh;
  }

  public move(movementType: CharacterMovement): void {
    if (this.currentMovement !== movementType) {
      this.startTransition(movementType);
      this.currentMovement = movementType;
    }
  }

  private startTransition(movementType: CharacterMovement): void {
    const newAnimation = this.animations[movementType];
    if (this.mesh && newAnimation) {
      const isReverse = movementType === CharacterMovement.Backward;
      const speedRatio = isReverse ? -1 : 1;
      const newAnimatable = this.scene.beginWeightedAnimation(
        this.mesh.skeleton,
        newAnimation.from,
        newAnimation.to,
        0,
        true,
        speedRatio
      );

      let elapsedTime = 0;
      const interval = setInterval(() => {
        elapsedTime += this.scene.getEngine().getDeltaTime() / 1000;
        const blendFactor = Math.min(elapsedTime / this.blendDuration, 1);

        newAnimatable.weight = blendFactor;
        this.activeAnimations.forEach(
          (anim) => (anim.weight = 1 - blendFactor)
        );

        if (blendFactor === 1) {
          this.activeAnimations.forEach((anim) => anim.stop());
          this.activeAnimations = [newAnimatable];
          clearInterval(interval);
        }
      }, 1);
    }
  }
}

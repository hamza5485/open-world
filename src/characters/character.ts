import { Scene, SceneLoader, AbstractMesh, AnimationRange } from 'babylonjs';
import { CameraController } from '../controllers/camera-controller';

export enum CharacterMovement {
  Idle,
  Walk,
  Run,
  Left,
  Right,
  Backward,
}

export class Character {
  private mesh: AbstractMesh | undefined;
  private currentMovement: CharacterMovement | null = null;
  private animations: {
    idle: AnimationRange | null;
    walk: AnimationRange | null;
    run: AnimationRange | null;
    left: AnimationRange | null;
    right: AnimationRange | null;
  };

  constructor(
    private scene: Scene,
    private cameraController: CameraController
  ) {
    this.animations = {
      idle: null,
      walk: null,
      run: null,
      left: null,
      right: null,
    };
    this.setupCharacter();
  }

  private setupCharacter(): void {
    SceneLoader.ImportMesh(
      '',
      '/meshes/',
      'dummy3.babylon',
      this.scene,
      (newMeshes, _, skeletons) => {
        const skeleton = skeletons[0];
        this.animations = {
          idle: skeleton.getAnimationRange('YBot_Idle'),
          walk: skeleton.getAnimationRange('YBot_Walk'),
          run: skeleton.getAnimationRange('YBot_Run'),
          left: skeleton.getAnimationRange('YBot_LeftStrafeWalk'),
          right: skeleton.getAnimationRange('YBot_RightStrafeWalk'),
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
      this.currentMovement = movementType;
      switch (movementType) {
        case CharacterMovement.Idle:
          this.animate(this.animations.idle);
          break;
        case CharacterMovement.Walk:
          this.animate(this.animations.walk);
          break;
        case CharacterMovement.Backward:
          this.animate(this.animations.walk, true);
          break;
        case CharacterMovement.Run:
          this.animate(this.animations.run);
          break;
        case CharacterMovement.Left:
          this.animate(this.animations.left);
          break;
        case CharacterMovement.Right:
          this.animate(this.animations.right);
          break;
      }
    }
  }

  private animate(
    animation: AnimationRange | null,
    reverse: boolean = false
  ): void {
    if (this.mesh && animation) {
      const speedRatio = reverse ? -1 : 1;
      this.scene.beginAnimation(
        this.mesh,
        animation.from,
        animation.to,
        true,
        speedRatio
      );
    }
  }
}

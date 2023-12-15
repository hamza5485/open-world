import { ActionManager, ExecuteCodeAction, Scene } from 'babylonjs';

export class InputController {
  private keyboardEventStatus: Record<string, boolean>;

  constructor(private scene: Scene) {
    this.keyboardEventStatus = {
      w: false,
      s: false,
      a: false,
      d: false,
      Shift: false,
    };
    this.initializeKeyboardEvents();
  }

  private initializeKeyboardEvents(): void {
    this.scene.actionManager = new ActionManager(this.scene);

    this.scene.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
        let key: string = evt.sourceEvent.key;
        if (key !== 'Shift') {
          key = key.toLowerCase();
        }
        if (key in this.keyboardEventStatus) {
          this.keyboardEventStatus[key] = true;
        }
      })
    );

    this.scene.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
        let key: string = evt.sourceEvent.key;
        if (key !== 'Shift') {
          key = key.toLowerCase();
        }
        if (key in this.keyboardEventStatus) {
          this.keyboardEventStatus[key] = false;
        }
      })
    );
  }

  public isKeyPressed(key: string): boolean {
    return this.keyboardEventStatus[key];
  }
}

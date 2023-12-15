import { Engine } from 'babylonjs';

export class AppUtilities {
  constructor(private engine: Engine) {
    this.setupWindowResizeListener();
  }

  private setupWindowResizeListener(): void {
    window.addEventListener('resize', () => {
      this.engine.resize();
    });
  }
}

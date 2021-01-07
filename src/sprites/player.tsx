import { GameObjects, Scene } from "phaser";

export class PlayerSprite extends GameObjects.Sprite {
  private playerSpeed = 3;
  constructor(scene: Scene, x: number, y: number, key = "player") {
    super(scene, x, y, key);
    this.scene.add.existing(this);
  }

  update(): void {
    if (this.scene.input.activePointer.isDown) {
      this.x += this.playerSpeed;
    }
  }
}

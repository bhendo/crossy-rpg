import { GameObjects, Scene } from "phaser";

export class TreasureSprite extends GameObjects.Sprite {
  constructor(scene: Scene, x: number, y: number, key = "treasure") {
    super(scene, x, y, key);
    this.scene.add.existing(this);
  }
}

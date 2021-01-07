import { GameObjects } from "phaser";

export class DragonSprite extends GameObjects.Sprite {
  private minY = 80;
  private maxY = 280;
  private velocity: number;

  constructor(scene: Phaser.Scene, x: number, y: number, key = "dragon") {
    super(scene, x, y, key);

    const direction = Math.random() < 0.5 ? 1 : -1;
    const speed = 2 + Math.random() * (4 - 2);

    this.velocity = direction * speed;
    this.scene.add.existing(this);
  }
  update(): void {
    this.y += this.velocity;

    if (
      (this.velocity > 0 && this.y >= this.maxY) ||
      (this.velocity < 0 && this.y <= this.minY)
    ) {
      this.velocity *= -1;
    }
  }
}

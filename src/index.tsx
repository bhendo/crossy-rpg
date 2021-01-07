import Phaser from "phaser";

import { MainScene } from "./scenes";

new Phaser.Game({
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: new MainScene("game"),
});

import { Scene, GameObjects } from "phaser";
import { DragonSprite, PlayerSprite, TreasureSprite } from "../sprites";
import { assets } from "../assets";

type Score = {
  attempt: number;
  highest: number;
  last: number;
};

export class MainScene extends Scene {
  private player: Phaser.GameObjects.Sprite;
  private treasure: Phaser.GameObjects.Sprite;
  private dragons: Phaser.GameObjects.Group;
  private isTerminating = false;
  private score: Score = { attempt: 0, highest: 0, last: 0 };

  constructor(config: string) {
    super(config);
  }
  preload(): void {
    assets.forEach((asset) => {
      this.load.image(asset.key, asset.image);
    });
  }
  create(): void {
    this.score.attempt++;
    this.isTerminating = false;
    const yStart = Number(this.sys.game.config.height) / 2;

    this.add.sprite(0, 0, "background").setOrigin(0, 0);
    this.player = new PlayerSprite(this, 40, yStart).setScale(0.5);
    const groupCreateConfig: Phaser.Types.GameObjects.Group.GroupCreateConfig = {
      classType: DragonSprite,
      key: "dragon",
      repeat: 5,
      setXY: {
        x: 90,
        y: 100,
        stepX: 80,
        stepY: 20,
      },
    };
    this.dragons = this.add.group(groupCreateConfig);

    this.dragons.getChildren().forEach((dragon) => {
      (dragon as DragonSprite).setFlipX(true).setScale(0.6);
    });

    this.treasure = new TreasureSprite(
      this,
      Number(this.sys.game.config.width) - 80,
      yStart
    ).setScale(0.6);

    this.scene.scene.make.text({
      x: 10,
      y: 10,
      text: `Attempt: ${this.score.attempt}\nLast: ${this.score.last}\nHighest: ${this.score.highest}`,
      style: {
        fontSize: "12px",
        fontFamily: "Arial",
        color: "#ffffff",
        align: "left",
      },
      add: true,
    });
  }
  update(): void {
    if (this.isTerminating) return;

    this.player.update();

    const playerRect = this.player.getBounds();
    const treasureRect = this.treasure.getBounds();

    if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
      return this.gameOver(true);
    }

    this.dragons.getChildren().forEach((dragon, index) => {
      const dragonSprite = dragon as DragonSprite;
      dragonSprite.update();
      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          playerRect,
          dragonSprite.getBounds()
        )
      ) {
        this.score.last = index;
        this.score.highest =
          index > this.score.highest ? index : this.score.highest;
        return this.gameOver(false);
      }
    });
  }
  gameOver(win: boolean): void {
    this.isTerminating = true;
    this.cameras.main.shake(500);
    this.cameras.main.on(
      "camerashakecomplete",
      () => {
        if (win) {
          this.scene.scene.make.text({
            x: 20,
            y: 100,
            text: "Congratulations, you got the treasure!",
            style: {
              fontSize: "64px",
              fontFamily: "Arial",
              color: "#ffffff",
              align: "center",
              wordWrap: { width: Number(this.sys.game.config.width) - 20 },
            },
            add: true,
          });
          return;
        } else this.cameras.main.fadeOut(500);
      },
      this
    );
    this.cameras.main.on(
      "camerafadeoutcomplete",
      () => {
        this.add.sprite(0, 0, "gameover").setOrigin(0, 0);
        this.cameras.main.fadeIn(1000);
      },
      this
    );
    this.cameras.main.on(
      "camerafadeincomplete",
      () => {
        this.scene.restart();
      },
      this
    );
  }
}

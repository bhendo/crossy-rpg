import backgroundImage from "./background.png";
import dragonImage from "./dragon.png";
import gameoverImage from "./gameover.png";
import playerImage from "./player.png";
import treasureImage from "./treasure.png";

const assets: { key: string; image: string }[] = [
  { key: "background", image: backgroundImage },
  { key: "gameover", image: gameoverImage },
  { key: "dragon", image: dragonImage },
  { key: "player", image: playerImage },
  { key: "treasure", image: treasureImage },
];

export { assets };

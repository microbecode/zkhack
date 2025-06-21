import { Player } from "../types/player";
import { GameManager } from "./gameManager";

export class PlayerHandler {
  player: Player;

  constructor(startX: number, startY: number, private game: GameManager) {
    this.player = {
      x: startX,
      y: startY,
    };
  }

  get playerPosition() {
    return { x: this.player.x, y: this.player.y };
  }

  setPosition(x: number, y: number) {
    this.player.x = x;
    this.player.y = y;
  }

  move(dx: number, dy: number, handleCell: (x: number, y: number) => boolean) {
    const newX = this.player.x + dx;
    const newY = this.player.y + dy;

    if (handleCell(newX, newY)) {
      this.player.x = newX;
      this.player.y = newY;
    }
  }
}

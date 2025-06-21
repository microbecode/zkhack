import { runAction } from "../hyli/hyli";
import { GameEvent } from "../types/gameEvent";

export class EventHandler {
  handle(event: GameEvent) {
    if (event.type === "playerMoved") {
      console.log("playerMoved", event.x);
      //      runAction(event.x, event.y);
    }
  }
}

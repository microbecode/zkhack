import { Item } from "./item";

export type GameEvent =
  | { type: "playerMoved"; x: number; y: number }
  | { type: "playerCollided"; x: number; y: number }
  | { type: "playerFinished"; x: number; y: number }
  | { type: "itemPicked"; item: Item; at: { x: number; y: number } }
  | { type: "levelCompleted"; levelId: number }
  | { type: "levelChanged"; levelId: number };

type GameEventHandler = (event: GameEvent) => void;

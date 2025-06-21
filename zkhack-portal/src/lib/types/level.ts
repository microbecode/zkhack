import { Cell, CellType } from "./cell";
import { Item } from "./item";

export interface Level {
  id: number;
  name: string;
  description: string;
  grid: CellType[][];
  items: Array<{
    x: number;
    y: number;
    item: Item;
  }>;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
}

export interface LevelProgress {
  levelId: number;
  completed: boolean;
  itemsCollected: number;
  totalItems: number;
}

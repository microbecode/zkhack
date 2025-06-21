import { CellType } from "../types/cell";
import { Level } from "../types/level";

// Level 1: Simple maze with basic obstacles
export const LEVEL_1: Level = {
  id: 1,
  name: "The Beginning",
  description: "A simple maze to get you started. Find your way to the exit!",
  grid: [
    [
      CellType.START,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.WALL,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.END,
    ],
  ],
  items: [
    { x: 2, y: 2, item: { id: "item-1-1", name: "Key Fragment" } },
    { x: 4, y: 4, item: { id: "item-1-2", name: "Ancient Coin" } },
    { x: 6, y: 6, item: { id: "item-1-3", name: "Mystic Gem" } },
  ],
  startPosition: { x: 0, y: 0 },
  endPosition: { x: 9, y: 9 },
};

// Level 2: More complex maze with multiple paths
export const LEVEL_2: Level = {
  id: 2,
  name: "The Labyrinth",
  description: "A more challenging maze with multiple paths and dead ends.",
  grid: [
    [
      CellType.START,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.WALL,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.WALL,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.EMPTY,
      CellType.END,
    ],
  ],
  items: [
    { x: 2, y: 1, item: { id: "item-2-1", name: "Crystal Shard" } },
    { x: 7, y: 2, item: { id: "item-2-2", name: "Mystic Rune" } },
    { x: 2, y: 6, item: { id: "item-2-3", name: "Ancient Scroll" } },
    { x: 8, y: 8, item: { id: "item-2-4", name: "Golden Key" } },
  ],
  startPosition: { x: 0, y: 0 },
  endPosition: { x: 9, y: 9 },
};

// Level 3: Complex maze with strategic item placement
export const LEVEL_3: Level = {
  id: 3,
  name: "The Master's Challenge",
  description:
    "The ultimate test. Navigate through a complex maze with strategic obstacles.",
  grid: [
    [
      CellType.START,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.WALL,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.WALL,
      CellType.WALL,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.WALL,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
    ],
    [
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.EMPTY,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.WALL,
      CellType.EMPTY,
      CellType.END,
    ],
  ],
  items: [
    { x: 4, y: 1, item: { id: "item-3-1", name: "Dragon Scale" } },
    { x: 8, y: 2, item: { id: "item-3-2", name: "Phoenix Feather" } },
    { x: 2, y: 4, item: { id: "item-3-3", name: "Unicorn Horn" } },
    { x: 8, y: 6, item: { id: "item-3-4", name: "Mystic Orb" } },
    { x: 4, y: 8, item: { id: "item-3-5", name: "Master's Key" } },
  ],
  startPosition: { x: 0, y: 0 },
  endPosition: { x: 9, y: 9 },
};

export const LEVELS: Level[] = [LEVEL_1, LEVEL_2, LEVEL_3];

// Validation function to ensure all levels are exactly 10x10
export function validateLevels() {
  LEVELS.forEach((level) => {
    if (level.grid.length !== 10) {
      throw new Error(
        `Level ${level.id} has ${level.grid.length} rows, expected 10`
      );
    }
    level.grid.forEach((row, rowIndex) => {
      if (row.length !== 10) {
        throw new Error(
          `Level ${level.id} row ${rowIndex} has ${row.length} columns, expected 10`
        );
      }
    });

    // Validate item positions are within bounds
    level.items.forEach((item) => {
      if (item.x < 0 || item.x >= 10 || item.y < 0 || item.y >= 10) {
        throw new Error(
          `Level ${level.id} item at (${item.x}, ${item.y}) is out of bounds`
        );
      }
    });

    // Validate start and end positions
    if (
      level.startPosition.x < 0 ||
      level.startPosition.x >= 10 ||
      level.startPosition.y < 0 ||
      level.startPosition.y >= 10
    ) {
      throw new Error(
        `Level ${level.id} start position (${level.startPosition.x}, ${level.startPosition.y}) is out of bounds`
      );
    }
    if (
      level.endPosition.x < 0 ||
      level.endPosition.x >= 10 ||
      level.endPosition.y < 0 ||
      level.endPosition.y >= 10
    ) {
      throw new Error(
        `Level ${level.id} end position (${level.endPosition.x}, ${level.endPosition.y}) is out of bounds`
      );
    }
  });
  console.log("✅ All levels validated successfully - 10x10 grids");
}

// Run validation
validateLevels();

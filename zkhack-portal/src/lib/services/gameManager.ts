// lib/GameManager.ts
import { GridHandler } from "@/lib/services/gridHandler";
import { PlayerHandler } from "@/lib/services/playerHandler";
import { Item } from "lib/types/item";
import { Level, LevelProgress } from "lib/types/level";
import { LEVELS } from "lib/data/levels";
import { GameEvent } from "../types/gameEvent";
import { EventHandler } from "./eventHandler";

export class GameManager {
  gridHandler: GridHandler;
  playerHandler: PlayerHandler;
  eventHandler: EventHandler;
  currentLevelId: number = 1;
  levelProgress: Map<number, LevelProgress> = new Map();
  itemsCollected: number = 0;
  steps: number = 0;

  constructor() {
    this.gridHandler = new GridHandler(this);
    this.playerHandler = new PlayerHandler(0, 0, this);
    this.eventHandler = new EventHandler();
    this.loadLevel(1); // Start with level 1
  }

  loadLevel(levelId: number): void {
    const level = LEVELS.find((l) => l.id === levelId);
    if (!level) {
      throw new Error(`Level ${levelId} not found`);
    }

    this.currentLevelId = levelId;
    this.gridHandler.loadLevel(level);

    // Reset player position to level start
    this.playerHandler.setPosition(
      level.startPosition.x,
      level.startPosition.y
    );

    // Reset items collected for this level
    this.itemsCollected = 0;
    this.steps = 0;

    // Initialize level progress if not exists
    if (!this.levelProgress.has(levelId)) {
      this.levelProgress.set(levelId, {
        levelId,
        completed: false,
        itemsCollected: 0,
        totalItems: level.items.length,
      });
    }

    this.emit({ type: "levelChanged", levelId });
  }

  nextLevel(): void {
    const nextLevelId = this.currentLevelId + 1;
    if (LEVELS.find((l) => l.id === nextLevelId)) {
      this.loadLevel(nextLevelId);
    }
  }

  getCurrentLevel(): Level | null {
    return LEVELS.find((l) => l.id === this.currentLevelId) || null;
  }

  getLevelProgress(levelId: number): LevelProgress | undefined {
    return this.levelProgress.get(levelId);
  }

  onItemPicked(item: Item): void {
    this.itemsCollected++;
    const progress = this.levelProgress.get(this.currentLevelId);
    if (progress) {
      progress.itemsCollected = this.itemsCollected;
    }
  }

  onLevelCompleted(): void {
    const progress = this.levelProgress.get(this.currentLevelId);
    if (progress) {
      progress.completed = true;
    }
    this.emit({ type: "levelCompleted", levelId: this.currentLevelId });
  }

  // onEvent(handler: GameEventHandler) {
  //   this.eventHandlers.push(handler);
  // }

  emit(event: GameEvent) {
    this.eventHandler.handle(event);

    if (event.type === "playerMoved") {
      this.steps++;
    }
  }
}

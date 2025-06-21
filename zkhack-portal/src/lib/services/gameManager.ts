// lib/GameManager.ts
import { GridHandler } from '@/lib/services/gridHandler';
import { PlayerHandler } from '@/lib/services/playerHandler';
import { Item } from 'lib/types/item';

type GameEvent =
    | { type: 'playerMoved'; x: number; y: number }
    | { type: 'playerCollided'; x: number; y: number }
    | { type: 'playerFinished'; x: number; y: number }
    | { type: 'itemPicked'; item: Item; at: { x: number; y: number } };

type GameEventHandler = (event: GameEvent) => void;

export class GameManager {
    gridHandler: GridHandler;
    playerHandler: PlayerHandler;
    private eventHandlers: GameEventHandler[] = [];

    constructor() {
        this.gridHandler = new GridHandler(this);
        this.gridHandler.generateGrid(10, 10)
        const startCell = this.gridHandler.startPosition;
        if (startCell == null) {
            throw Error("Start cell cannot be null")
        }
        this.playerHandler = new PlayerHandler(startCell.x, startCell.y, this);
        this.onEvent(e => console.log('[GameEvent]', e));
    }

    onEvent(handler: GameEventHandler) {
        this.eventHandlers.push(handler);
    }

    emit(event: GameEvent) {
        for (const handler of this.eventHandlers) {
            handler(event);
        }
    }
}
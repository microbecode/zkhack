import { Cell, CellType } from "../types/cell"
import { Item } from "../types/item";
import { GameManager } from "./gameManager";

export class GridHandler {
    grid: Cell[][] | null = null
    startPosition: Cell | null = null
    endPosition: Cell | null = null

    constructor(private game: GameManager) {

    }

    generateGrid(rows: number, cols: number): void {
        const grid: Cell[][] = [];
        for (let y = 0; y < rows; y++) {
            const row: Cell[] = [];
            for (let x = 0; x < cols; x++) {
                let type: CellType = Math.random() < 0.2 ? CellType.WALL : CellType.EMPTY;
                row.push({ x, y, type });
            }
            grid.push(row);
        }

        grid[0][0].type = CellType.START;
        grid[rows - 1][cols - 1].type = CellType.END;
        this.grid = grid
        this.startPosition = grid[0][0]
        this.endPosition = grid[rows - 1][cols - 1]

        this.generateRandomItems(5)
    }

    private generateRandomItems(count: number) {
        if (!this.grid) return;

        const flat = this.grid.flat();
        const emptyCells = flat.filter(
            (cell) => cell.type === CellType.EMPTY && !cell.item
        );


        for (let i = 0; i < count && emptyCells.length > 0; i++) {
            const index = Math.floor(Math.random() * emptyCells.length);
            const cell = emptyCells.splice(index, 1)[0];

            const item: Item = {
                id: `item-${cell.x}-${cell.y}`,
                name: `item`,
            };

            cell.item = item;
        }
    }

    handleCell(x: number, y: number): boolean {
        if (this.grid == null) {
            throw Error("Grid cannot be null here.")
        }

        const cell = this.grid[y]?.[x];

        if (cell.type == CellType.WALL) {
            this.game.emit({ type: 'playerCollided', x, y })
        }

        if (cell.type == CellType.END) {
            this.game.emit({ type: 'playerFinished', x, y })
        }

        if (cell.type == CellType.EMPTY) {
            if (cell.item) {
                this.game.emit({ type: 'itemPicked', item: cell.item, at: { x, y } })
            }
            this.game.emit({ type: 'playerMoved', x, y })
        }
        return !!cell && cell.type !== CellType.WALL;
    }
}

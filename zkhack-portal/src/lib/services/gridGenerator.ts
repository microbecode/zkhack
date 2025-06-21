import { Cell, CellType } from '../types/cell'

const grid: Cell[][] = []

export function generateGrid(rows: number, cols: number): Cell[][] {
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

    return grid;
}
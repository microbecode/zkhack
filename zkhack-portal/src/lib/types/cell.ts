export enum CellType {
    EMPTY = 'empty',
    WALL = 'wall',
    START = 'start',
    END = 'end',
}

export interface Cell {
    x: number,
    y: number,
    type: CellType
}
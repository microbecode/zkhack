import { Item } from "./item";

export enum CellType {
    EMPTY = 'empty',
    WALL = 'wall',
    START = 'start',
    END = 'end',
}

export type Cell = {
    x: number,
    y: number,
    type: CellType
    item?: Item;

}

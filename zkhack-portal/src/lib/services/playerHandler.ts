export class PlayerHandler {
    curX: number
    curY: number

    constructor(startX: number, startY: number){
        this.curX = startX
        this.curY = startY
    }

    move(e: KeyboardEvent): void {
        if (e.key === 'ArrowUp') this.curY -= 1;
        if (e.key === 'ArrowDown') this.curY += 1;
        if (e.key === 'ArrowLeft') this.curX -= 1;
        if (e.key === 'ArrowRight') this.curX += 1;
    }
}
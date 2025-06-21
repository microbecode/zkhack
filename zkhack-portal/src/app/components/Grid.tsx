import { Cell, CellType } from 'lib/types/cell';

export default function Grid({ grid, children }: { grid: Cell[][] | null, children?: React.ReactNode }) {
    if (!grid || grid.length === 0) return <p>Loading grid...</p>; // fallback

    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${grid[0].length}, 32px)` }}>
            {grid.flat().map(cell => (
                <div
                    key={`${cell.x}-${cell.y}`}
                    style={{
                        width: 32,
                        height: 32,
                        backgroundColor: getColor(cell.type),
                        boxSizing: 'border-box',
                    }}
                />
            ))}
            {children}
        </div>
    );
}

function getColor(type: CellType) {
    switch (type) {
        case CellType.START: return 'green';
        case CellType.END: return 'red';
        case CellType.WALL: return 'black';
        default: return 'white';
    }
}

import { Cell, CellType } from "lib/types/cell";

export default function Grid({
  grid,
  children,
}: {
  grid: Cell[][] | null;
  children?: React.ReactNode;
}) {
  if (!grid || grid.length === 0) return <p>Loading grid...</p>; // fallback

  const backgrounds = [];

  // Base tile (e.g. road/ground)
  backgrounds.push("url('/sprites/road-1.png')");

  // Conditional overlay
  // if (cell.type === CellType.WALL) {
  //   backgrounds.push("url('/sprites/house-1.png')");
  // }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${grid[0].length}, 30px)`,
        position: "relative",
      }}
    >
      {grid.flat().map((cell) => {
        const backgrounds = [];
        if (cell.sprite) {
          backgrounds.push(`url('${cell.sprite}')`);
        }

        // Base tile (e.g. road/ground)
        backgrounds.push("url('/sprites/road-1.png')");
        const isEndCell = cell.type === CellType.END;

        return (
          <div
          key={`${cell.x}-${cell.y}`}
          style={{
            width: 30,
            height: 30,
            backgroundImage: backgrounds.join(','),
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: getColor(cell.type),
            boxSizing: 'border-box',
            boxShadow: isEndCell
              ? '0 0 8px 4px gold'
              : undefined,
          }}
          />
        );
      })}
      {children}
    </div>
  );
}

function getColor(type: CellType) {
  switch (type) {
    case CellType.START:
      return "green";
    case CellType.END:
      return "red";
    case CellType.WALL:
      return "black";
    default:
      return "white";
  }
}

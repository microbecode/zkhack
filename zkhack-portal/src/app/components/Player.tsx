import { PlayerHandler } from "@/lib/services/playerHandler";

export default function Player({ handler }: { handler: PlayerHandler }) {
  const { x, y } = handler.playerPosition;

  return (
    <div
      style={{
        position: "absolute",
        width: 16,
        height: 16,
        backgroundImage: "url(sprites/player-1.png)",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: 4,
        boxShadow:'0 0 8px 4px gold',
        transform: `translate(${x * 30}px, ${y * 30}px)`,
        transition: "transform 0.1s ease-in-out",
      }}
    />
  );
}

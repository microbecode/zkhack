import { PlayerHandler } from '@/lib/services/playerHandler';

export default function Player({ handler }: { handler: PlayerHandler }) {
    const { x, y } = handler.playerPosition;

    return (
        <div
            style={{
                position: 'absolute',
                width: 16,
                height: 16,
                backgroundColor: 'blue',
                borderRadius: 4,
                boxShadow: '0 0 4px rgba(0,0,0,0.3)',
                transform: `translate(${x * 32}px, ${y * 32}px)`,
                transition: 'transform 0.1s ease-in-out',
            }}
        />
    );
}

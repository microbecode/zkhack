// app/context/GameProvider.tsx
'use client';

import { ReactNode, useMemo } from 'react';
import { GameContext } from './GameContext';
import { GameManager } from 'lib/services/gameManager';

export function GameProvider({ children }: { children: ReactNode }) {
    const game = useMemo(() => {
        const gm = new GameManager();
        return gm;
    }, []);

    return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}

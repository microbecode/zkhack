// context/GameProvider.tsx
"use client";

import { ReactNode, useState, useRef } from "react";
import { GameContext, GameUpdateContext } from "./GameContext";
import { GameManager } from "lib/services/gameManager";

export function GameProvider({ children }: { children: ReactNode }) {
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const gameRef = useRef<GameManager | null>(null);

  if (!gameRef.current) {
    const gm = new GameManager();

    const originalLoadLevel = gm.loadLevel.bind(gm);
    gm.loadLevel = (levelId: number) => {
      originalLoadLevel(levelId);
      setUpdateTrigger((n) => n + 1); // triggers rerender for consumers of GameUpdateContext
      console.log("loadLevel triggered -> rerender");
    };

    gameRef.current = gm;
  }

  return (
    <GameContext.Provider value={gameRef.current}>
      <GameUpdateContext.Provider value={updateTrigger}>
        {children}
      </GameUpdateContext.Provider>
    </GameContext.Provider>
  );
}

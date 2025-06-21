// app/context/GameProvider.tsx
"use client";

import { ReactNode, useMemo, useState, useCallback } from "react";
import { GameContext } from "./GameContext";
import { GameManager } from "lib/services/gameManager";

export function GameProvider({ children }: { children: ReactNode }) {
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const game = useMemo(() => {
    const gm = new GameManager();

    // Override the loadLevel method to trigger re-renders
    const originalLoadLevel = gm.loadLevel.bind(gm);
    gm.loadLevel = (levelId: number) => {
      originalLoadLevel(levelId);
      setUpdateTrigger((prev) => prev + 1);
    };

    return gm;
  }, [updateTrigger]);

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}

// context/GameContext.tsx
import { createContext, useContext } from "react";
import { GameManager } from "lib/services/gameManager";

export const GameContext = createContext<GameManager | null>(null);
export const GameUpdateContext = createContext<number>(0);

export function useGame() {
  const game = useContext(GameContext);
  if (!game) throw new Error("GameContext not available");
  return game;
}

export function useGameUpdateTrigger() {
  return useContext(GameUpdateContext);
}

// Re-export GameProvider for convenience
export { GameProvider } from "./GameProvider";

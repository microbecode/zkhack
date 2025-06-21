// context/GameContext.tsx
import { createContext, useContext } from "react";
import { GameManager } from "lib/services/gameManager";

export const GameContext = createContext<GameManager | null>(null);

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("GameContext not available");
  return ctx;
}

// Re-export GameProvider for convenience
export { GameProvider } from "./GameProvider";

import { useGame } from "../context/GameContext";
import { LEVELS } from "@/lib/data/levels";
import styles from "./LevelSelector.module.css";

export function LevelSelector() {
  const gm = useGame();
  const currentLevel = gm.getCurrentLevel();

  const handleLevelSelect = (levelId: number) => {
    gm.loadLevel(levelId);
  };

  const getLevelStatus = (levelId: number) => {
    const progress = gm.getLevelProgress(levelId);
    if (!progress) return "locked";
    if (progress.completed) return "completed";
    return "available";
  };

  return (
    <div className={styles.levelSelector}>
      <h2>Levels</h2>
      <div className={styles.levelGrid}>
        {LEVELS.map((level) => {
          const status = getLevelStatus(level.id);
          const progress = gm.getLevelProgress(level.id);

          return (
            <div
              key={level.id}
              className={`${styles.levelCard} ${styles[status]} ${
                level.id === gm.currentLevelId ? styles.active : ""
              }`}
              onClick={() => handleLevelSelect(level.id)}
            >
              <h3>Level {level.id}</h3>
              <p>{level.name}</p>
              {progress && (
                <div className={styles.progress}>
                  <span>
                    {progress.itemsCollected}/{progress.totalItems} items
                  </span>
                  {progress.completed && (
                    <span className={styles.completed}>✓</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

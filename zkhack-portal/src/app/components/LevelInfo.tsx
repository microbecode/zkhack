import { useGame } from "../context/GameContext";
import styles from "./LevelInfo.module.css";

export function LevelInfo() {
  const gm = useGame();
  const currentLevel = gm.getCurrentLevel();
  const progress = gm.getLevelProgress(gm.currentLevelId);

  if (!currentLevel) return null;

  return (
    <div className={styles.levelInfo}>
      <div className={styles.levelHeader}>
        <h2>
          Level {currentLevel.id}: {currentLevel.name}
        </h2>
        <p>{currentLevel.description}</p>
      </div>

      <div className={styles.progressInfo}>
        <div className={styles.itemProgress}>
          <span>Items Collected:</span>
          <span className={styles.itemCount}>
            {gm.itemsCollected} / {currentLevel.items.length}
          </span>
        </div>

        <div className={styles.stepProgress}>
          <span>Steps:</span>
          <span className={styles.stepCount}>{gm.steps}</span>
        </div>

        {progress && (
          <div className={styles.levelStatus}>
            <span>Status:</span>
            <span
              className={
                progress.completed ? styles.completed : styles.inProgress
              }
            >
              {progress.completed ? "Completed" : "In Progress"}
            </span>
          </div>
        )}
      </div>

      <div className={styles.controls}>
        <button
          onClick={() => gm.loadLevel(gm.currentLevelId)}
          className={styles.resetButton}
        >
          Reset Level
        </button>

        {gm.currentLevelId > 1 && (
          <button
            onClick={() => gm.loadLevel(gm.currentLevelId - 1)}
            className={styles.prevButton}
          >
            Previous Level
          </button>
        )}

        {gm.currentLevelId < 3 && (
          <button
            onClick={() => gm.loadLevel(gm.currentLevelId + 1)}
            className={styles.nextButton}
          >
            Next Level
          </button>
        )}
      </div>
    </div>
  );
}

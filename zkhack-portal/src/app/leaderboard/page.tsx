"use client";

import Link from "next/link";
import { leaderboardData } from "@/lib/data/leaderboard";
import styles from "./leaderboard.module.css";

// TODO: use real leaderboard data

export default function LeaderboardPage() {
  const sortedLeaderboard = [...leaderboardData].sort((a, b) => {
    if (a.level !== b.level) {
      return b.level - a.level; // Higher level first
    }
    return a.steps - b.steps; // Fewer steps first
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>🏆 Highly Kebabulous Leaderboard</h1>
          <p>Top players in the quest for the perfect kebab</p>
        </div>

        <div className={styles.leaderboard}>
          <div className={styles.tableHeader}>
            <div className={styles.rank}>Rank</div>
            <div className={styles.name}>Player</div>
            <div className={styles.level}>Level</div>
            <div className={styles.steps}>Steps</div>
          </div>

          {sortedLeaderboard.map((entry, index) => (
            <div key={index} className={styles.leaderboardRow}>
              <div className={styles.rank}>
                {index === 0 && "🥇"}
                {index === 1 && "🥈"}
                {index === 2 && "🥉"}
                {index > 2 && `#${index + 1}`}
              </div>
              <div className={styles.name}>{entry.name}</div>
              <div className={styles.level}>Level {entry.level}</div>
              <div className={styles.steps}>{entry.steps} steps</div>
            </div>
          ))}
        </div>

        <div className={styles.backButton}>
          <Link href="/" className={styles.link}>
            ← Back to Game
          </Link>
        </div>
      </main>
    </div>
  );
}

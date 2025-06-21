'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { generateGrid } from "@/lib/services/gridGenerator";
import { Cell } from "@/lib/types/cell";
import Grid from "./components/Grid";

export default function Home() {
  const [grid, setGrid] = useState<Cell[][]>([]);

  useEffect(() => {
    const newGrid = generateGrid(10, 10);
    setGrid(newGrid);
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Grid grid={grid} />
      </main>
      {/* <footer className={styles.footer}>
      </footer> */}
    </div>
  );
}

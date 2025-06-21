"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Grid from "./components/Grid";
import { HyliWallet, useWallet, WalletProvider } from "hyli-wallet";
import { CONTRACT_NAME, runAction } from "@/lib/hyli/hyli";
import { GameProvider, useGame } from "./context/GameContext";
import Player from "./components/Player";
import { ItemComponent } from "./components/Item";
import { LevelInfo } from "./components/LevelInfo";
import { LevelSelector } from "./components/LevelSelector";

function Home() {
  const { logout, wallet, createIdentityBlobs } = useWallet();
  const [grid, setGrid] = useState<any[][]>([]);
  const [currNum, setCurrNum] = useState(0); // temp location of the player

  const action = async () => {
    const [blob0, blob1] = createIdentityBlobs();
    setCurrNum(currNum + 1);
    await runAction([blob0, blob1], currNum);
  };

  const gm = useGame();

  const [, forceRender] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const moveMap = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
      };

      const move = moveMap[e.key as keyof typeof moveMap];

      if (move) {
        gm.playerHandler.move(move[0], move[1], (x, y) =>
          gm.gridHandler.handleCell(x, y)
        );
        forceRender((n) => n + 1); // trigger rerender
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Listen for levelChanged events
    const handler = (event: any) => {
      if (event.type === "levelChanged") {
        forceRender((n) => n + 1);
      }
    };
    gm.onEvent(handler);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // No way to remove a single event handler from gm, but that's ok for now
    };
  }, [gm]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LevelInfo />
        <Grid grid={gm.gridHandler.grid}>
          {gm.gridHandler.grid
            ?.flat()
            .map((cell) =>
              cell.item ? (
                <ItemComponent
                  key={`item-${cell.item.id}`}
                  item={cell.item}
                  x={cell.x}
                  y={cell.y}
                />
              ) : null
            )}
          <Player handler={gm.playerHandler}></Player>
        </Grid>
        <LevelSelector />
        <div className={styles.buttonContainer}>
          <button onClick={() => logout()}>Logout</button>
          <button onClick={() => action()}>Action</button>
        </div>
      </main>
    </div>
  );
}

function AppContent() {
  const { logout, wallet, createIdentityBlobs } = useWallet();

  if (!wallet) {
    return <LandingPage />;
  }

  return (
    <GameProvider>
      <Home />
    </GameProvider>
  );
}

function LandingPage() {
  return (
    <div className="wallet-page-wrapper">
      <div className="landing-content-simple">
        <h1 className="hero-title">
          <span className="gradient-text">Hyli</span> App Scaffold
        </h1>
        <p className="hero-subtitle">
          A starting point for your next blockchain application
        </p>
        <HyliWallet providers={["password"]} />
      </div>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  );
}

function App() {
  return (
    <WalletProvider
      config={{
        nodeBaseUrl: "http://localhost:4321",
        walletServerBaseUrl: "http://localhost:4001",
        applicationWsUrl: "ws://localhost:8082/ws",
      }}
      sessionKeyConfig={{
        duration: 24 * 60 * 60 * 1000, // Session key duration in ms (default: 72h)
        whitelist: [CONTRACT_NAME], // Required: contracts allowed for session key
      }}
      /* forceSessionKeyCreation={true} // Default: undefined, letting user decide */
    >
      <AppContent />
    </WalletProvider>
  );
}

export default App;

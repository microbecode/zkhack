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
import { ToastContainer } from "./components/Toast";

function Home() {
  const { logout, wallet } = useWallet();
  const [grid, setGrid] = useState<any[][]>([]);
  const [currNum, setCurrNum] = useState(0); // temp location of the player
  const [toasts, setToasts] = useState<
    Array<{ id: string; message: string; duration?: number }>
  >([]);

  const action = async () => {
    setCurrNum(currNum + 1);
    await runAction(currNum, currNum + 1);
  };

  const gm = useGame();

  const [, forceRender] = useState(0);

  const addToast = (message: string, duration = 2000) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

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
        const [dx, dy] = move;
        const direction =
          dx === 1 ? "right" : dx === -1 ? "left" : dy === 1 ? "down" : "up";

        // Get current position before move
        const currentPos = gm.playerHandler.playerPosition;

        // Perform the move
        gm.playerHandler.move(dx, dy, (x, y) =>
          gm.gridHandler.handleCell(x, y)
        );

        // Get new position after move
        const newPos = gm.playerHandler.playerPosition;

        // Only show toast if the position actually changed (move was successful)
        if (newPos.x !== currentPos.x || newPos.y !== currentPos.y) {
          // Show immediate movement toast
          //addToast(`Moved ${direction} to (${newPos.x}, ${newPos.y})`);

          // Handle transaction asynchronously without blocking UI
          runAction(newPos.x, newPos.y)
            .then((txHash) => {
              //console.log("txHash", txHash);
              const shortHash = txHash.slice(0, 5) + "..." + txHash.slice(-5);
              addToast(`Generated tx: ${shortHash}`);
            })
            .catch((error) => {
              console.error("Transaction failed:", error);
              addToast(`Transaction failed: ${error.message}`);
            });
        }

        forceRender((n) => n + 1); // trigger rerender
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // No way to remove a single event handler from gm, but that's ok for now
    };
  }, [gm, addToast, forceRender]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div style={{ display: 'flex', gap: 16 }}>
          <LevelInfo />
          <div>
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
          </div>
        <LevelSelector />
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={() => logout()}>Logout</button>
          <button onClick={() => action()}>Action</button>
        </div>
      </main>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}

function AppContent() {
  const { wallet } = useWallet();

  // if (!wallet) {
  //   return <LandingPage />;
  // }

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

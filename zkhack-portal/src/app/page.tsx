"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { generateGrid } from "@/lib/services/gridGenerator";
import { Cell } from "@/lib/types/cell";
import Grid from "./components/Grid";
import { HyliWallet, useWallet, WalletProvider } from "hyli-wallet";
import { runAction } from "@/lib/hyli/hyli";

function Home() {
  const { logout, wallet, createIdentityBlobs } = useWallet();
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [currNum, setCurrNum] = useState(0); // temp location of the player

  const action = async () => {
    const [blob0, blob1] = createIdentityBlobs();
    setCurrNum(currNum + 1);
    await runAction([blob0, blob1], currNum);
  };

  useEffect(() => {
    const newGrid = generateGrid(10, 10);
    setGrid(newGrid);
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Grid grid={grid} />
        <button onClick={() => logout()}>Logout</button>
        <button onClick={() => action()}>Action</button>
      </main>
      {/* <footer className={styles.footer}>
      </footer> */}
    </div>
  );
}

function AppContent() {
  const { logout, wallet, createIdentityBlobs } = useWallet();

  if (!wallet) {
    return <LandingPage />;
  }

  return <Home />;
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
        <HyliWallet providers={["password", "google", "github"]} />
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
        whitelist: ["contract1", "contract2"], // Required: contracts allowed for session key
      }}
      /* forceSessionKeyCreation={true} // Default: undefined, letting user decide */
    >
      <AppContent />
    </WalletProvider>
  );
}

export default App;

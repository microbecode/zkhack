import type { Metadata } from "next";
import "./globals.css";
import { GameProvider } from "./context/GameProvider";

export const metadata: Metadata = {
  title: "ZKHack",
  description: "ZKHack Berlin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}

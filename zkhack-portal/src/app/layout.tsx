import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GameProvider } from "./context/GameProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Highly Kebabulous - ZKHack",
  description: "A ZK-powered game built on the Hyli blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
        <link
          rel="shortcut icon"
          href="/favicon.svg?v=2"
          type="image/svg+xml"
        />
        <link rel="apple-touch-icon" href="/favicon.svg?v=2" />
      </head>
      <body className={inter.className}>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { GameProvider } from "./context/GameProvider";

export const metadata: Metadata = {
  title: "Kebab Quest - ZKHack",
  description:
    "Navigate through mazes and collect kebabs in this ZK-powered game",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="">
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}

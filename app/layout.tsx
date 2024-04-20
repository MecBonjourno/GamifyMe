import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

const inter = Space_Mono({ subsets: ["latin"], weight: '400', style: "normal" });

export const metadata: Metadata = {
  title: "GamifyMe",
  description: "Gamify a better you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={inter.className}>
        <Navbar/>
        {children}
        </body>
    </html>
  );
}

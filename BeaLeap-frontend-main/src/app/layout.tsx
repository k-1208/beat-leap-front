import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Press_Start_2P, Pixelify_Sans } from "next/font/google";



const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",          // Press Start 2P only has 400
  display: "swap",
  variable: "--font-press-start",
});

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "700"], // choose what you need
  display: "swap",
  variable: "--font-pixelify",
});


const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GenAI Workshop",
  description: "GenAI Workshop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased mx-4 min-h-screen bg-black text-white p-4 ${inter.className} flex flex-col`}
      >

        <main className="flex-1 min-h-0">{children}</main>
        {/* <footer>
          <p>&copy; 2025 GenAI Workshop</p>
        </footer> */}
      </body>
    </html>
  );
}

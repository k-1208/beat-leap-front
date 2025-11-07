import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


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

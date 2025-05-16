import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NeuroCoderFL - Federated Self-Improving Compiler",
  description: "A Federated Self-Improving Compiler with LLM-Driven Feedback Optimization",
  keywords: ["compiler", "federated learning", "LLM", "optimization", "machine learning"],
  authors: [{ name: "NeuroCoderFL Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#3b82f6",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0c0c0e" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-50 text-neutral-800 dark:bg-neutral-950 dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}

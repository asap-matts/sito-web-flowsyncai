import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import localFont from "next/font/local";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-red-hat-display",
  display: "swap",
});

const glacialIndifference = localFont({
  src: [
    {
      path: "../fonts/GlacialIndifference-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/GlacialIndifference-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-glacial",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlowSync AI — Intelligent Systems for Business",
  description:
    "FlowSync AI leverages artificial intelligence to build systems that improve productivity, efficiency, and reduce business costs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${redHatDisplay.variable} ${glacialIndifference.variable} font-body antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

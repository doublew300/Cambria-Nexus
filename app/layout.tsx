import type { Metadata } from "next";
import { Pixelify_Sans, Germania_One, Inter } from "next/font/google";
import "./globals.css";

const pixelify = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  display: "swap",
});

const germania = Germania_One({
  weight: "400",
  variable: "--font-germania",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CAMBRIA NEXUS",
  description: "The ultimate utility dashboard for Cambria MMO.",
  manifest: "/manifest.json",
  themeColor: "#1a0b2e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pixelify.variable} ${germania.variable} ${inter.variable} antialiased bg-cambria-purple text-foreground font-sans`}
      >
        {children}
      </body>
    </html>
  );
}

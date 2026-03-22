import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jio Commerce Platform | Next-Gen Commerce Solution",
  description:
    "Jio Commerce Platform: The next-generation commerce infrastructure powering Reliance Retail. Enterprise-scale commerce for D2C, Marketplace, B2B, and Omnichannel retail.",
  keywords: [
    "commerce platform",
    "e-commerce",
    "retail technology",
    "omnichannel",
    "Jio Commerce",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-white text-jio-navy font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

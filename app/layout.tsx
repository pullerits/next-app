import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/contexts/CartContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TRACKPRO - Premium E-commerce Store",
  description: "Discover premium products with secure checkout, fast shipping, and exceptional customer service. Shop TRACKPRO for the best deals and quality products.",
  keywords: ["e-commerce", "online shopping", "premium products", "trackpro"],
  authors: [{ name: "TRACKPRO Team" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b2a6b',
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <CartProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/ScrollToTop";
import { RouteSpinner } from "@/components/RouteSpinner";
import { ProgressProvider } from "@/context/ProgressContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeNivra - Learn Web Development",
  description: "Learn to build production-ready web applications from a senior engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-800`}
      >
        {/* Header/Navbar */}
        <Navbar />

        {/* Main Content */}
        <main id="main-content" className="focus:outline-none">
          <ProgressProvider>
            {children}
          </ProgressProvider>
        </main>

        <RouteSpinner />

        <ScrollToTop />

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}

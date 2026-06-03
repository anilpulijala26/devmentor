import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/ScrollToTop";
import { RouteSpinner } from "@/components/RouteSpinner";
import { ProgressProvider } from "@/context/ProgressContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codenivra.com"),
  title: "CodeNivra",
  description:
    "Learn coding from scratch to deployment with structured frontend, backend, fullstack, CI/CD, and cloud learning paths.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${mono.variable} bg-slate-50 text-slate-800 antialiased`}
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

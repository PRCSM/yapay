import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CustomScrollbar } from "@/components/providers/CustomScrollbar";
import { Cursor } from "@/components/providers/Cursor";
import { RevealController } from "@/components/providers/RevealController";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://yapay.example"),
  title: { default: "Yapay — Scale Finance With Smarter Payments", template: "%s · Yapay" },
  description:
    "Yapay is an all-in-one payments platform: online and in-person payments, subscriptions, payment links, billing and analytics for growing businesses.",
  openGraph: { title: "Yapay — Scale Finance With Smarter Payments", type: "website" },
};

export const viewport: Viewport = { themeColor: "#141414", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <a href="#main" className="sr-only z-[200] rounded-full bg-white px-4 py-2 text-sm focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <SmoothScroll>
          {children}
          <RevealController />
          <CustomScrollbar />
          <Cursor />
        </SmoothScroll>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/scroll/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const scheinSans = localFont({
  src: "../../public/fonts/Schein Sans.otf",
  variable: "--font-schein-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MODEL XRS | Flagship Acoustic Intelligence Wireless Headphones",
  description: "Sound without compromise. Experience the MODEL XRS featuring hybrid 48dB Active Noise Cancellation, custom-coated Beryllium drivers, 80-hour battery reserve, and a personalized real-time soundstage customizer.",
  keywords: [
    "MODEL EARS",
    "MODEL XRS",
    "premium wireless headphones",
    "high-res audio",
    "hybrid active noise cancellation",
    "48dB ANC",
    "Beryllium drivers",
    "custom equalizer",
    "acoustic intelligence",
    "audiophile soundstage"
  ],
  authors: [{ name: "MODEL EARS Team" }],
  openGraph: {
    title: "MODEL XRS | Flagship Acoustic Intelligence Wireless Headphones",
    description: "Sound without compromise. Experience hybrid 48dB ANC, custom-coated Beryllium drivers, and personalized EQ customizer.",
    type: "website",
    siteName: "MODEL EARS",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "MODEL XRS | Flagship Acoustic Intelligence Wireless Headphones",
    description: "Sound without compromise. Experience hybrid 48dB ANC, Beryllium drivers, and custom soundscapes.",
    creator: "@model_ears"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${scheinSans.variable} h-full antialiased`}
    >
      <SmoothScroll />
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

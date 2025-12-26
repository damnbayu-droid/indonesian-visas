import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "INDONESIAN VISAS - Visa On Arrival | 16+ Years Experience | Fast Processing",
  description: "INDONESIAN VISAS - Professional Visa On Arrival services with 16+ years experience. Fast visa processing for 97 countries. Apply online now!",
  keywords: [
    "Indonesian Visas",
    "Visa on Arrival Indonesia",
    "Indonesia Visa",
    "Visa Extension",
    "Tourist Visa Indonesia",
    "Business Visa Indonesia"
  ],
  authors: [{ name: "Indonesian Visas" }],
  robots: "index, follow",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "INDONESIAN VISAS - Visa On Arrival | 16+ Years Experience | Fast Processing",
    description: "Fast, reliable, and professional visa services for your Indonesia adventure. We serve 97 countries with expert support and dedicated customer service available 24/7.",
    type: "website",
    url: "https://indonesianvisas.com",
    siteName: "INDONESIAN VISAS",
  },
  twitter: {
    card: "summary_large_image",
    title: "INDONESIAN VISAS - Visa On Arrival | 16+ Years Experience | Fast Processing",
    description: "Fast, reliable, and professional visa services for your Indonesia adventure. We serve 97 countries with expert support and dedicated customer service available 24/7.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

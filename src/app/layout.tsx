import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Motifax | AI Motif Identifier & Design DNA Analysis",
  description: "Upload any image to identify textile patterns, architectural motifs, and design history instantly. The professional tool for curators and designers.",
  keywords: [
    "AI Motif Identifier", 
    "Identify Pattern History", 
    "Textile Design DNA", 
    "Architectural Motif Analysis", 
    "Visual Search for Design",
    "Pattern Recognition AI"
  ],
  // This is the base for Open Graph tags
  twitter: {
    card: "summary_large_image",
    title: "Motifax AI",
    description: "The world's first Design DNA Identifier.",
  },
  // This points to the dynamic image we just created
  openGraph: {
    title: "Motifax | AI Design DNA Decoder",
    description: "Identify any motif instantly with professional AI analysis.",
    url: "https://motifax.ai", // Replace with your Netlify URL
    siteName: "Motifax",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}>
        {children}

        {/* The "Mf" Floating Badge */}
        <div className="fixed bottom-6 left-6 z-[9999] pointer-events-auto">
          <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg border border-white/20 hover:scale-110 transition-transform cursor-pointer group">
            <span className="text-sm font-bold tracking-tighter italic select-none">
              Mf
            </span>
            
            {/* Tooltip that appears on hover */}
            <div className="absolute left-12 px-2 py-1 bg-black text-[10px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-widest uppercase pointer-events-none">
              Motifax Engine
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
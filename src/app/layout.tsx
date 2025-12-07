import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-tech",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fifthtech.vercel.app"),
  title: {
    default: "FifthTech",
    template: "%s • FifthTech",
  },
  description: "FifthTech — soluções digitais sob medida",
  applicationName: "FifthTech",

  icons: {
    icon: [
      { url: "/images/logo-url.png" }, // fallback
    ],
    shortcut: ["/images/logo-url.png"],
    apple: ["/images/logo-url.png"],
  },

  openGraph: {
    title: "FifthTech",
    description: "FifthTech — soluções digitais sob medida",
    url: "/",
    siteName: "FifthTech",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },

  twitter: {
    card: "summary_large_image",
    title: "FifthTech",
    description: "FifthTech — soluções digitais sob medida",
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Mafoo-Sumone Recap",
  description: "",
  icons: ["favicon.png"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`font-ggbatang antialiased bg-image`}>{children}</body>
      <GoogleAnalytics gaId="G-LYZW7D247W" />
    </html>
  );
}

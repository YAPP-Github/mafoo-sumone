import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mafoo-Sumone Recap",
  description: "",
  icons: ["favicon.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-ggbatang antialiased bg-image`}>{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { use } from "react";
import { Locale } from "@/types/page";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mafoo-Sumone Recap",
  description: "",
  icons: ["/favicon.png"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export async function generateStaticParams() {
  return [
    { lang: "ko" },
    { lang: "en" },
    { lang: "ja" },
    { lang: "tw" },
    { lang: "es" },
  ];
}

type Params = Promise<{ locale: string }>;

export default function RootLayout(props: {
  children: React.ReactNode;
  params: Params;
}) {
  const params = use(props.params);
  const fonts = {
    ko: "font-ggbatang",
    en: "font-contra",
    ja: "font-jf",
    tw: "font-mamelon",
    es: "font-contra",
  };
  return (
    <html lang={params.locale}>
      <body
        className={`${fonts[params.locale as Locale]} antialiased bg-image`}
      >
        {props.children}
      </body>
      <GoogleAnalytics
        gaId={`${process.env.NEXT_PUBLIC_GA || "G-LYZW7D247W"}`}
      />
      {process.env.NEXT_PUBLIC_GTM && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
      )}
    </html>
  );
}

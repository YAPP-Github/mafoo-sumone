import type { Metadata, Viewport } from "next";
import { use } from "react";

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

type Params = Promise<{ locale: string }>;

export default function RootLayout(props: {
  children: React.ReactNode;
  params: Params;
}) {
  const params = use(props.params);

  if (!params.locale) {
    console.log(params, "here");
  }

  console.log(params);
  return (
    <html lang="en">
      <body className={``}>{props.children}</body>
    </html>
  );
}

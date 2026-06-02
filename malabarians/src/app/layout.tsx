import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MALABARIANS Instant Avil Milk Mix – Traditional Kerala Taste",
  description:
    "MALABARIANS Instant Avil Milk Mix with Banana & Cardamom. Ready in 30 seconds – just add water and shake. Authentic Kerala taste, modern convenience. Only ₹50.",
  keywords: [
    "Avil Milk Mix",
    "Kerala traditional drink",
    "Malabarians",
    "Instant beverage",
    "Banana Cardamom",
    "Ready to drink Kerala",
  ],
  openGraph: {
    title: "MALABARIANS Instant Avil Milk Mix",
    description: "Traditional Kerala Avil Milk in a convenient ready-to-mix format. Just add water & shake. Only ₹50.",
    type: "website",
    locale: "en_IN",
    siteName: "MALABARIANS",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#f5a623" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}

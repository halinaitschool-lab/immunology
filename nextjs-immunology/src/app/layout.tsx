import type { Metadata } from "next";
import { DM_Sans, Nunito, Playfair_Display } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import "./guide.css";
import "../styles/landing-nav.css";

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin", "latin-ext"],
});

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
});

const playfair = Playfair_Display({
  variable: "--font-title",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ліля Нестеровська | Алергологія та імунологія",
  description:
    "Консультації, освітні матеріали та професійний контент з алергології та імунології.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${nunito.variable} ${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

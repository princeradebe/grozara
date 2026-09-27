import type { Metadata, Viewport } from "next";
import { Caveat, Inter, Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: "900",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: "700",
});

export const metadata: Metadata = {
  title: "Grozara: your lists and loyalty cards, together",
  description:
    "Grozara is the shopping app for South Africans: simple lists, Boyfriend Mode photo lists, shared lists you shop together live, and all your loyalty cards in one place. Coming soon to the App Store and Google Play.",
};

export const viewport: Viewport = {
  themeColor: "#0D211D",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-ZA"
      className={`${nunito.variable} ${inter.variable} ${caveat.variable} antialiased`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}

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

const TITLE = "Grozara: your lists and loyalty cards, together";
const DESCRIPTION =
  "Grozara is the shopping app for South Africans: simple lists, Boyfriend Mode photo lists, shared lists you shop together live, and all your loyalty cards in one place. Coming soon to the App Store and Google Play.";

// The share image and icons are files in app/ (opengraph-image.jpg, twitter-image.jpg, icon.svg,
// apple-icon.png); Next adds their tags. metadataBase makes their URLs absolute, which link
// previews on WhatsApp, X and Facebook need. grozara.com redirects to www, so www is canonical.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.grozara.com"),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Grozara",
  openGraph: {
    type: "website",
    siteName: "Grozara",
    locale: "en_ZA",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
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

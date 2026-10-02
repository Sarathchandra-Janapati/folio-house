import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { Ambient } from "@/components/Ambient";
import { Cursor } from "@/components/Cursor";
import { Preloader } from "@/components/Preloader";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: { default: "Folio House · Hire independent designers", template: "%s · Folio House" },
  description:
    "Folio House is a portfolio marketplace for independent designers in fashion, footwear, interiors, architecture, jewellery, furniture, ceramics and textiles.",
};

export const viewport: Viewport = { themeColor: "#0b0b0c", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Ambient />
          <SmoothScroll />
          <Preloader />
          <Cursor />
          <a href="#main" className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90]">Skip to content</a>
          <Nav />
          <main id="main" className="relative z-10 pt-[96px]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

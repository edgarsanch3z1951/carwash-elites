import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Carwash Elites | Mobile Detailing in Ventura County, CA",
  description:
    "Premium mobile car wash and detailing in Ventura County. Book Exterior Refresh, Basic, Premium, or Elite packages — we come to you. Call (805) 668-8107.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    title: "Carwash Elites | Mobile Detailing in Ventura County",
    description:
      "Showroom-quality mobile detailing delivered to your driveway across Ventura County, CA. Exterior Refresh, Basic, Premium, and Elite packages.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Carwash Elites — Mobile Detailing in Ventura County",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carwash Elites | Mobile Detailing in Ventura County",
    description:
      "Showroom-quality mobile detailing delivered to your driveway across Ventura County, CA.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}

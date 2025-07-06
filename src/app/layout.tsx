import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Matt Bernier - Fractional Product Management & Technical Consulting",
    template: "%s | Matt Bernier"
  },
  description: "Fractional Product Management Leader, Developer, writer, and creator. Expert technical consulting and product strategy services.",
  keywords: ["Fractional Product Management", "Technical Consulting", "Product Strategy", "Software Development", "AI Integration", "Product Leadership"],
  authors: [{ name: "Matt Bernier", url: "https://mbernier.com" }],
  creator: "Matt Bernier",
  publisher: "Matt Bernier",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mbernier.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mbernier.com",
    title: "Matt Bernier - Fractional Product Management & Technical Consulting",
    description: "Fractional Product Management Leader, Developer, writer, and creator. Expert technical consulting and product strategy services.",
    siteName: "Matt Bernier",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Matt Bernier - Fractional Product Management & Technical Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matt Bernier - Fractional Product Management & Technical Consulting",
    description: "Fractional Product Management Leader, Developer, writer, and creator. Expert technical consulting and product strategy services.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`font-inter antialiased bg-white text-graphite`}>
        {children}
      </body>
    </html>
  );
}

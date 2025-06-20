import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderAdapter from "../components/HeaderAdapter";
import Footer from "../components/Footer";
import Script from "next/script";
import { constructMetadata } from "../lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme script to prevent flashing */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getThemePreference() {
                  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
                    return localStorage.getItem('theme');
                  }
                  return 'light'; // Default to light mode, not system preference
                }
                
                const theme = getThemePreference();
                document.documentElement.classList.toggle('dark', theme === 'dark');
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <HeaderAdapter />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-EHZ8F1GBXV" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EHZ8F1GBXV');
          `}
        </Script>
      </body>
    </html>
  );
}

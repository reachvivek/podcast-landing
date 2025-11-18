import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PODOVER - Podcast Landing Page",
  description: "Our pick of the best podcasts on Spotify, Apple Podcasts and more covering technology, culture, science, politics & new ideas.",
  keywords: ["podcast", "audio", "episodes", "listen", "streaming", "podover"],
  authors: [{ name: "Podover Team" }],
  creator: "Podover",
  publisher: "Podover",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://podover.com",
    title: "PODOVER - Podcast Landing Page",
    description: "Our pick of the best podcasts on Spotify, Apple Podcasts and more covering all trends.",
    siteName: "PODOVER",
  },
  twitter: {
    card: "summary_large_image",
    title: "PODOVER - Podcast Landing Page",
    description: "Our pick of the best podcasts on Spotify, Apple Podcasts and more covering all trends.",
    creator: "@podover",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

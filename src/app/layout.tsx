import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";

// Inter - Modern, clean sans-serif for everything
// Perfect for tech/creative brands, excellent readability
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "EcoSpace - Premier Podcast Studio Dubai | Professional Recording & Production",
  description: "Dubai's premier podcast studio at Dubai World Trade Center. Professional recording, video production, editing services. Book your session today. Starting from 350 AED.",
  keywords: [
    "podcast studio Dubai",
    "recording studio Dubai",
    "podcast production Dubai",
    "video podcast Dubai",
    "DWTC podcast studio",
    "Dubai World Trade Center studio",
    "professional podcast recording",
    "podcast editing services",
    "social media content creation Dubai",
    "EcoSpace Dubai"
  ],
  authors: [{ name: "EcoSpace Dubai" }],
  creator: "EcoSpace",
  publisher: "EcoSpace",
  applicationName: "EcoSpace Podcast Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ecospace.ae",
    title: "EcoSpace - Dubai's Premier Podcast Studio at DWTC",
    description: "Professional podcast recording, video production & editing services. State-of-the-art equipment, expert team, flexible packages. Book your session at Dubai World Trade Center.",
    siteName: "EcoSpace",
    images: [
      {
        url: "/images/hero section image.jpg",
        width: 1200,
        height: 630,
        alt: "EcoSpace Podcast Studio - Dubai World Trade Center"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoSpace - Premier Podcast Studio Dubai",
    description: "Professional podcast recording & production at Dubai World Trade Center. Book your session today.",
    creator: "@podcast.ecospace",
    images: ["/images/hero section image.jpg"],
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
  verification: {
    google: "your-google-verification-code-here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

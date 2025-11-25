import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { BookingProvider } from '@/contexts/BookingContext';
import { StructuredData } from '@/components/seo/StructuredData';

// Inter - Modern, clean sans-serif for everything
// Perfect for tech/creative brands, excellent readability
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: "EcoSpace - Premier Podcast Studio Dubai | Professional Recording & Production",
    template: "%s | EcoSpace Podcast Studio"
  },
  description: "Dubai's premier podcast studio at Dubai World Trade Center. Professional recording, video production, editing services. Book your session today. Starting from 350 AED.",
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/images/IMG_20251121_085355_649.png', type: 'image/png', sizes: '512x512' }
    ],
    apple: [
      { url: '/images/IMG_20251121_085355_649.png', sizes: '512x512', type: 'image/png' }
    ],
  },
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
    locale: "en_AE",
    url: "https://ecospace.ae",
    title: "EcoSpace - Dubai's Premier Podcast Studio at DWTC",
    description: "Professional podcast recording, video production & editing services. State-of-the-art equipment, expert team, flexible packages. Book your session at Dubai World Trade Center.",
    siteName: "EcoSpace",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EcoSpace Podcast Studio - Professional Recording Setup at Dubai World Trade Center",
        type: "image/jpeg"
      },
      {
        url: "/images/IMG_20251121_085355_649.png",
        width: 512,
        height: 512,
        alt: "EcoSpace Logo",
        type: "image/png"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoSpace - Premier Podcast Studio Dubai | DWTC",
    description: "Professional podcast recording & video production at Dubai World Trade Center. State-of-the-art equipment, expert team. Book your session from 350 AED.",
    creator: "@podcast.ecospace",
    images: ["/images/og-image.jpg"],
    site: "@podcast.ecospace",
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
      <head>
        <StructuredData />
      </head>
      <body className="antialiased">
        <BookingProvider>
          {children}
        </BookingProvider>
      </body>
    </html>
  );
}

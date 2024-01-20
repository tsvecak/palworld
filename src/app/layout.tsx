import { Metadata } from 'next';
import Script from 'next/script';
import * as React from 'react';

import '@/styles/globals.css';

import Header from '@/components/Header';
import { ThemeProvider } from '@/components/theme-provider';

import { siteConfig } from '@/constant/config';
// TODO: Fix OG Images
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/images/favicon.png',
  },
  // manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    // images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    // images: [`${siteConfig.url}/images/og.jpg`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3782270251926648"
        crossOrigin="anonymous"
        data-ad-client="ca-pub-3782270251926648"
      />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

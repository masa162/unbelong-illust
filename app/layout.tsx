import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'unbelong - イラストギャラリー',
  description: 'オリジナルイラスト作品を展示するギャラリーサイト',
  openGraph: {
    title: 'unbelong - イラストギャラリー',
    description: 'オリジナルイラスト作品を展示するギャラリーサイト',
    url: 'https://illust.unbelong.xyz',
    siteName: 'unbelong',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'unbelong - イラストギャラリー',
    description: 'オリジナルイラスト作品を展示するギャラリーサイト',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8D38ZK9LT5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8D38ZK9LT5');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}

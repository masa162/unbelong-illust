import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'unbelong - イラストギャラリー',
  description: 'オリジナルイラスト作品を展示するギャラリーサイト',
  openGraph: {
    title: 'unbelong - イラストギャラリー',
    description: 'オリジナルイラスト作品を展示するギャラリーサイト',
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
      <body className="antialiased">{children}</body>
    </html>
  );
}

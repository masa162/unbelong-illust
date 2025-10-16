import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* サイト情報 */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">unbelong</h3>
            <p className="text-gray-600 text-sm">
              オリジナルイラスト・マンガを公開するプラットフォーム
            </p>
          </div>

          {/* ナビゲーション */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">ナビゲーション</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-primary-600 text-sm transition-colors"
                >
                  イラスト
                </Link>
              </li>
              <li>
                <Link
                  href="https://unbelong-comic.pages.dev"
                  className="text-gray-600 hover:text-primary-600 text-sm transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  マンガ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-primary-600 text-sm transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* SNSリンク */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Follow</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-600 transition-colors"
                aria-label="Twitter"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} unbelong. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

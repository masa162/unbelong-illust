import { authorApi } from '@/lib/api';
import { getImageUrl, parseTags } from '@/lib/utils';
import type { AuthorProfile, SocialLinks } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const runtime = 'edge';

async function getAuthor(): Promise<AuthorProfile | null> {
  try {
    const response = await authorApi.get();
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('作者情報の取得に失敗しました:', error);
    return null;
  }
}

function parseSocialLinks(linksJson: string | null): SocialLinks {
  if (!linksJson) return {};
  try {
    return JSON.parse(linksJson);
  } catch {
    return {};
  }
}

export const metadata = {
  title: 'About | unbelong',
  description: '作者プロフィール',
};

export default async function AboutPage() {
  const author = await getAuthor();

  if (!author) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">作者情報が見つかりません</p>
        </main>
        <Footer />
      </div>
    );
  }

  const socialLinks = parseSocialLinks(author.social_links);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ヘッダー */}
        <div className="bg-gradient-to-b from-primary-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About</h1>
            <p className="text-lg text-gray-600">作者プロフィール</p>
          </div>
        </div>

        {/* プロフィールセクション */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* アバターと名前 */}
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-8">
              {/* アバター */}
              {author.avatar_image_id && (
                <div className="flex-shrink-0">
                  <img
                    src={getImageUrl(author.avatar_image_id, 'public')}
                    alt={author.name}
                    className="w-32 h-32 rounded-full object-cover shadow-md"
                  />
                </div>
              )}

              {/* 名前とSNS */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{author.name}</h2>

                {/* SNSリンク */}
                {Object.keys(socialLinks).length > 0 && (
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    {socialLinks.twitter && (
                      <a
                        href={socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        Twitter/X
                      </a>
                    )}
                    {socialLinks.instagram && (
                      <a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        Instagram
                      </a>
                    )}
                    {socialLinks.pixiv && (
                      <a
                        href={socialLinks.pixiv}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-[#0096FA] text-white rounded-lg hover:bg-[#0086e0] transition-colors"
                      >
                        Pixiv
                      </a>
                    )}
                    {socialLinks.blog && (
                      <a
                        href={socialLinks.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Blog
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 自己紹介 */}
            {author.bio && (
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{author.bio}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>

        {/* リンクセクション */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">作品を見る</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/"
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center"
              >
                <h4 className="text-xl font-semibold text-primary-600 mb-2">イラスト</h4>
                <p className="text-gray-600 text-sm">オリジナルイラスト作品</p>
              </a>
              <a
                href="https://unbelong-comic.pages.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center"
              >
                <h4 className="text-xl font-semibold text-primary-600 mb-2">マンガ</h4>
                <p className="text-gray-600 text-sm">オリジナルマンガ作品</p>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

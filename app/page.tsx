import Link from 'next/link';
import { notFound } from 'next/navigation';
import { illustrationsApi } from '@/lib/api';
import { getImageUrl } from '@/lib/utils';
import type { Illustration } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const runtime = 'edge';

async function getIllustrations(): Promise<Illustration[]> {
  try {
    const response = await illustrationsApi.list('published');
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error('イラストの取得に失敗しました:', error);
    return [];
  }
}

export default async function HomePage() {
  const illustrations = await getIllustrations();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ヒーローセクション */}
        <div className="bg-gradient-to-b from-primary-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Illustration Gallery
            </h1>
            <p className="text-lg text-gray-600">
              オリジナルイラスト作品を展示しています
            </p>
          </div>
        </div>

        {/* ギャラリーグリッド */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {illustrations.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                まだイラストが投稿されていません
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {illustrations.map((illustration) => (
                <Link
                  key={illustration.id}
                  href={`/illustrations/${illustration.slug}`}
                  className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  {/* 画像 */}
                  <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
                    <img
                      src={getImageUrl(illustration.image_id, 'public')}
                      alt={illustration.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* 情報 */}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {illustration.title}
                    </h2>
                    {illustration.description && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {illustration.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                      <span>👁️ {illustration.view_count.toLocaleString()}</span>
                      {illustration.published_at && (
                        <span>
                          {new Date(illustration.published_at * 1000).toLocaleDateString(
                            'ja-JP'
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

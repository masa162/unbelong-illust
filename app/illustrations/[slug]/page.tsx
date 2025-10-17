import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { illustrationsApi } from '@/lib/api';
import { getImageUrl, parseTags, formatDate } from '@/lib/utils';
import type { Illustration } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const runtime = 'edge';

async function getIllustration(slug: string): Promise<Illustration | null> {
  try {
    const response = await illustrationsApi.getBySlug(slug);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('イラストの取得に失敗しました:', error);
    return null;
  }
}

async function getAllIllustrations(): Promise<Illustration[]> {
  try {
    const response = await illustrationsApi.list('published');
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const illustration = await getIllustration(slug);

  if (!illustration) {
    return {
      title: 'イラストが見つかりません',
    };
  }

  const ogImageUrl = illustration.og_image_id
    ? getImageUrl(illustration.og_image_id, 'public')
    : getImageUrl(illustration.image_id, 'public');

  return {
    title: `${illustration.title} | unbelong`,
    description: illustration.description || '',
    openGraph: {
      title: illustration.title,
      description: illustration.description || '',
      images: ogImageUrl ? [ogImageUrl] : undefined,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: illustration.title,
      description: illustration.description || '',
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

export default async function IllustrationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const illustration = await getIllustration(slug);

  if (!illustration) {
    notFound();
  }

  const allIllustrations = await getAllIllustrations();
  const currentIndex = allIllustrations.findIndex((ill) => ill.id === illustration.id);
  const prevIllustration = currentIndex > 0 ? allIllustrations[currentIndex - 1] : null;
  const nextIllustration =
    currentIndex < allIllustrations.length - 1 ? allIllustrations[currentIndex + 1] : null;

  const tags = parseTags(illustration.tags);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* イラスト情報ヘッダー */}
        <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {illustration.title}
            </h1>
            {illustration.description && (
              <p className="text-gray-600 text-lg mb-4">{illustration.description}</p>
            )}
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>👁️ {illustration.view_count.toLocaleString()} 回</span>
              {illustration.published_at && (
                <span>📅 {formatDate(illustration.published_at)}</span>
              )}
            </div>
          </div>
        </div>

        {/* メイン画像 */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={getImageUrl(illustration.image_id, 'public')}
              alt={illustration.title}
              className="w-full h-auto"
            />
          </div>

          {/* タグ */}
          {tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-primary-100 text-primary-700 text-sm px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* コンテンツ（説明文） */}
          {illustration.content && (
            <div className="mt-8 prose prose-lg max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {illustration.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* ナビゲーション */}
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 前のイラスト */}
              <div>
                {prevIllustration ? (
                  <Link
                    href={`/illustrations/${prevIllustration.slug}`}
                    className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 group"
                  >
                    <div className="text-xs text-gray-500 mb-2">← 前の作品</div>
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={getImageUrl(prevIllustration.image_id, 'public')}
                          alt={prevIllustration.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 line-clamp-2">
                        {prevIllustration.title}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="h-full" />
                )}
              </div>

              {/* ギャラリーに戻る */}
              <div className="flex items-center justify-center">
                <Link
                  href="/"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  ← ギャラリーに戻る
                </Link>
              </div>

              {/* 次のイラスト */}
              <div>
                {nextIllustration ? (
                  <Link
                    href={`/illustrations/${nextIllustration.slug}`}
                    className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 group text-right"
                  >
                    <div className="text-xs text-gray-500 mb-2">次の作品 →</div>
                    <div className="flex items-center space-x-3 justify-end">
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 line-clamp-2">
                        {nextIllustration.title}
                      </div>
                      <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={getImageUrl(nextIllustration.image_id, 'public')}
                          alt={nextIllustration.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="h-full" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SNSシェアボタン */}
        <div className="border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 text-center">
              この作品をシェア
            </h3>
            <div className="flex justify-center space-x-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  illustration.title
                )}&url=${encodeURIComponent(
                  `https://illust.unbelong.xyz/illustrations/${illustration.slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1DA1F2] text-white px-6 py-3 rounded-lg hover:bg-[#1a8cd8] transition-colors"
              >
                𝕏でシェア
              </a>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: illustration.title,
                      url: window.location.href,
                    });
                  }
                }}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                シェア
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

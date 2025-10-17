'use client';

import { useState, useEffect } from 'react';
import { illustrationsApi } from '@/lib/api';
import { getImageUrl } from '@/lib/utils';
import type { Illustration } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [illustrations, setIllustrations] = useState<Illustration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    loadIllustrations();
  }, []);

  const loadIllustrations = async () => {
    try {
      const response = await illustrationsApi.list('published');
      if (response.data.success && response.data.data) {
        setIllustrations(response.data.data);
      }
    } catch (error) {
      console.error('イラストの取得に失敗しました:', error);
    } finally {
      setLoading(false);
    }
  };

  const openViewer = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeViewer = () => {
    setSelectedIndex(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null && selectedIndex < illustrations.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === 'Escape') {
        closeViewer();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  const selectedIllustration = selectedIndex !== null ? illustrations[selectedIndex] : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

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
              {illustrations.map((illustration, index) => (
                <button
                  key={illustration.id}
                  onClick={() => openViewer(index)}
                  className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 text-left w-full"
                >
                  {/* 画像 */}
                  <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                    <img
                      src={`${getImageUrl(illustration.image_id, 'public')}?width=600`}
                      alt={illustration.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
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
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* ポップアップビューワー */}
      {selectedIllustration && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
          onClick={closeViewer}
        >
          {/* 閉じるボタン */}
          <button
            onClick={closeViewer}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="閉じる"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 前へボタン */}
          {selectedIndex !== null && selectedIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10 p-2"
              aria-label="前の画像"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* 次へボタン */}
          {selectedIndex !== null && selectedIndex < illustrations.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10 p-2"
              aria-label="次の画像"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* メイン画像とコンテンツ */}
          <div
            className="max-w-7xl w-full mx-auto px-4 py-8 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 画像 */}
            <div className="w-full max-h-[70vh] flex items-center justify-center mb-6">
              <img
                src={getImageUrl(selectedIllustration.image_id, 'public')}
                alt={selectedIllustration.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* 情報 */}
            <div className="bg-white rounded-lg p-6 max-w-3xl w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedIllustration.title}
              </h2>
              {selectedIllustration.description && (
                <p className="text-gray-700 mb-4">{selectedIllustration.description}</p>
              )}
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>👁️ {selectedIllustration.view_count.toLocaleString()} 回</span>
                {selectedIllustration.published_at && (
                  <span>
                    📅{' '}
                    {new Date(selectedIllustration.published_at * 1000).toLocaleDateString(
                      'ja-JP'
                    )}
                  </span>
                )}
              </div>

              {/* ナビゲーション情報 */}
              <div className="mt-4 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
                {selectedIndex !== null && (
                  <p>
                    {selectedIndex + 1} / {illustrations.length}
                    <span className="ml-4 text-xs">
                      (← → キーで移動 / ESC で閉じる)
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

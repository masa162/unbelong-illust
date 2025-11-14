import { MetadataRoute } from 'next';
import { illustrationsApi } from '@/lib/api';

export const revalidate = 3600; // 1時間ごとに再生成

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://illust.unbelong.xyz';

  try {
    // 公開中のイラスト一覧を取得
    const illustrationsResponse = await illustrationsApi.list('published');
    const illustrations = illustrationsResponse.data.success
      ? illustrationsResponse.data.data || []
      : [];

    // 静的ページ
    const routes: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    ];

    // イラストページを追加
    for (const illustration of illustrations) {
      routes.push({
        url: `${baseUrl}/illustrations/${illustration.slug}`,
        lastModified: illustration.updated_at
          ? new Date(illustration.updated_at)
          : new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }

    return routes;
  } catch (error) {
    console.error('Failed to generate sitemap:', error);
    // エラー時は最低限のルートを返す
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    ];
  }
}

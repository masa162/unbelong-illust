import type { CloudflareImageVariant } from '@/types';

/**
 * Cloudflare Images の URL を生成
 */
export function getImageUrl(
  imageId: string,
  variant: string | CloudflareImageVariant = 'public',
  domain: string = 'img.unbelong.xyz'
): string {
  if (typeof variant === 'string') {
    return `https://${domain}/${imageId}/${variant}`;
  }

  // カスタムバリアントの場合
  const params = new URLSearchParams();
  if (variant.width) params.append('width', variant.width.toString());
  if (variant.height) params.append('height', variant.height.toString());
  if (variant.fit) params.append('fit', variant.fit);
  if (variant.quality) params.append('quality', variant.quality.toString());
  if (variant.format) params.append('format', variant.format);

  const query = params.toString();
  return `https://${domain}/${imageId}/public${query ? `?${query}` : ''}`;
}

/**
 * タグのJSON文字列をパース
 */
export function parseTags(tagsJson: string | null): string[] {
  if (!tagsJson) return [];
  try {
    const parsed = JSON.parse(tagsJson);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * UNIX タイムスタンプを日付文字列に変換
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * UNIX タイムスタンプを日時文字列に変換
 */
export function formatDateTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

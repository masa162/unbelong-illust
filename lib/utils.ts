import type { CloudflareImageVariant } from '@/types';

/**
 * 環境変数を安全に取得
 */
function getEnv(key: string, defaultValue?: string): string {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue || '';
  }
  return defaultValue || '';
}

/**
 * Cloudflare Images の URL を生成
 * @param imageId Cloudflare Images ID
 * @param variant バリアント名またはカスタムバリアント設定
 * @param accountHash Cloudflareアカウントハッシュ（カスタムドメイン未設定時に使用）
 */
export function getImageUrl(
  imageId: string,
  variant: string | CloudflareImageVariant = 'public',
  accountHash: string = 'wdR9enbrkaPsEgUtgFORrw'
): string {
  // カスタムドメインが設定されている場合は環境変数から取得
  const customDomain = getEnv('NEXT_PUBLIC_CLOUDFLARE_IMAGES_DOMAIN');

  if (customDomain) {
    // カスタムドメイン使用
    if (typeof variant === 'string') {
      return `https://${customDomain}/${imageId}/${variant}`;
    }
    const params = new URLSearchParams();
    if (variant.width) params.append('width', variant.width.toString());
    if (variant.height) params.append('height', variant.height.toString());
    if (variant.fit) params.append('fit', variant.fit);
    if (variant.quality) params.append('quality', variant.quality.toString());
    if (variant.format) params.append('format', variant.format);
    const query = params.toString();
    return `https://${customDomain}/${imageId}/public${query ? `?${query}` : ''}`;
  }

  // デフォルト: Cloudflare Imagesのデフォルトドメインを使用
  // https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT>
  if (typeof variant === 'string') {
    return `https://imagedelivery.net/${accountHash}/${imageId}/${variant}`;
  }

  // カスタムバリアントの場合
  const params = new URLSearchParams();
  if (variant.width) params.append('width', variant.width.toString());
  if (variant.height) params.append('height', variant.height.toString());
  if (variant.fit) params.append('fit', variant.fit);
  if (variant.quality) params.append('quality', variant.quality.toString());
  if (variant.format) params.append('format', variant.format);

  const query = params.toString();
  return `https://imagedelivery.net/${accountHash}/${imageId}/public${query ? `?${query}` : ''}`;
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

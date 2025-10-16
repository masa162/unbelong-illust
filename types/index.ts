// unbelong イラストサイト 型定義

// 作品タイプ
export type WorkType = 'comic' | 'illustration';

// ステータス
export type Status = 'draft' | 'published' | 'archived';

// イラスト
export interface Illustration {
  id: string;
  work_id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null; // Markdown
  image_id: string;
  status: Status;
  og_image_id: string | null;
  view_count: number;
  tags: string | null; // JSON string
  created_at: number;
  updated_at: number;
  published_at: number | null;
}

// イラスト（作品情報付き）
export interface IllustrationWithWork extends Illustration {
  work_title: string;
  work_slug: string;
}

// 作者プロフィール
export interface AuthorProfile {
  id: number;
  name: string;
  bio: string | null;
  avatar_image_id: string | null;
  social_links: string | null; // JSON string
  created_at: number;
  updated_at: number;
}

// ソーシャルリンク
export interface SocialLinks {
  twitter?: string;
  instagram?: string;
  pixiv?: string;
  blog?: string;
  [key: string]: string | undefined;
}

// API レスポンス型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Cloudflare Images URL生成用
export interface CloudflareImageVariant {
  width?: number;
  height?: number;
  fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad';
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'json';
}

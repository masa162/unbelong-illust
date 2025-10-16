import axios from 'axios';
import type { Illustration, AuthorProfile, ApiResponse } from '@/types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://unbelong-api.belong2jazz.workers.dev';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Illustrations API
export const illustrationsApi = {
  list: (status?: string) =>
    api.get<ApiResponse<Illustration[]>>('/illustrations', { params: { status } }),
  getBySlug: (slug: string) =>
    api.get<ApiResponse<Illustration>>(`/illustrations/slug/${slug}`),
  get: (id: string) => api.get<ApiResponse<Illustration>>(`/illustrations/${id}`),
};

// Author API
export const authorApi = {
  get: () => api.get<ApiResponse<AuthorProfile>>('/author'),
};

export default api;

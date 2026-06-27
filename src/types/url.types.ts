export interface ShortenResponse {
  short_code: string;
  short_url: string;
  long_url: string;
}

export interface UrlStats {
  short_code: string;
  long_url: string;
  clicks: number;
  created_at: string;
}

import axios from "axios";
import type { ShortenResponse, UrlStats } from "../types/url.types";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({ baseURL: BASE_URL });

// attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("sniply_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const shortenUrl = async (
  long_url: string,
  uid?: string,
): Promise<ShortenResponse> => {
  const { data } = await api.post<ShortenResponse>("/api/shorten", {
    long_url,
    uid,
  });
  return data;
};

export const getStats = async (code: string): Promise<UrlStats> => {
  const { data } = await api.get<UrlStats>(`/api/stats/${code}`);
  return data;
};

export const getMyLinks = async (): Promise<ShortenResponse[]> => {
  const { data } = await api.get<ShortenResponse[]>("/api/my-links");
  return data;
};

// admin
export const adminGetStats = async () => {
  const { data } = await api.get("/admin/stats");
  return data;
};

export const adminGetLinks = async (page = 1) => {
  const { data } = await api.get(`/admin/links?page=${page}`);
  return data;
};

export const adminGetUsers = async () => {
  const { data } = await api.get("/admin/users");
  return data;
};

export const adminDeleteLink = async (code: string) => {
  const { data } = await api.delete(`/admin/links/${code}`);
  return data;
};

import type { AxiosRequestConfig } from 'axios';
import axiosInstance from './axiosInstance';

export async function GET<TResponse, TParams = void>(
  url: string,
  params?: TParams,
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  const { data } = await axiosInstance.get<TResponse>(url, { ...config, params });
  return data;
}

export async function POST<TRequest, TResponse>(
  url: string,
  payload?: TRequest,
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  const { data } = await axiosInstance.post<TResponse>(url, payload, config);
  return data;
}

export async function PUT<TRequest, TResponse>(
  url: string,
  payload?: TRequest,
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  const { data } = await axiosInstance.put<TResponse>(url, payload, config);
  return data;
}

export async function PATCH<TRequest, TResponse>(
  url: string,
  payload?: TRequest,
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  const { data } = await axiosInstance.patch<TResponse>(url, payload, config);
  return data;
}

export async function DELETE<TResponse>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  const { data } = await axiosInstance.delete<TResponse>(url, config);
  return data;
}

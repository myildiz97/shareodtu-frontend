"use server";

import axios, { AxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';

// Base URL for the API (from environment variable)
const baseURL = process.env.NEXT_PUBLIC_SHARE_ODTU_API_URL;

/**
 * A preconfigured generic axios function for making REST API requests.
 * 
 * @param endpoint - The endpoint path (relative to the base URL).
 * @param method - The HTTP method (GET, POST, PUT, DELETE, etc.).
 * @param data - Optional payload for POST/PUT requests.
 * @param params - Optional query parameters for the request.
 * @param config - Optional axios request configuration.
 * @returns A promise with the API response data.
 */
export async function makeRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  data?: any,
  params?: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    // Get the access token from the cookies
    const accessToken = (await cookies()).get('session');

    // Merge custom headers with default headers
    const headers = {
      Authorization: accessToken ? `Bearer ${accessToken.value}` : undefined,
      'Content-Type': 'application/json',
      ...config?.headers,
    };

    const response = await axios({
      baseURL,
      url: endpoint,
      method,
      data,
      params,
      headers,
      ...config,
    });

    return response.data;
  } catch (error: any) {
    console.error('API Request Error:', error.response || error.message);
    throw error.response?.data || error.message;
  }
}

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
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (server or network related)
      const status = error.response?.status;
      const errorMessage = error.response?.data?.detail || error.message;

      console.error("API Request Error:", {
        method,
        url: `${baseURL}${endpoint}`,
        status,
        message: errorMessage,
        data: error.response?.data,
      });

      // Throw a structured error object
      // throw {
      //   status: status || 500,
      //   message: errorMessage || "An unexpected error occurred",
      //   data: error.response?.data || null,
      // };
      throw new Error(errorMessage);
    } else {
      // Handle unknown errors
      console.error("Unexpected Error:", error);

      throw {
        status: 500,
        message: "A network error occurred",
        data: null,
      };
    }
  }
}

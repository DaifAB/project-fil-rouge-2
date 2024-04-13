import { auth } from '@/config/firebase-config';
import { getIdToken } from './auth';

/**
 * Generic function for http calls
 */
export default async function http<T = any>({
  url,
  method = 'GET',
  body,
  queryParams = {},
  token,
  headers,
  cache,
}: any) {
  let joinedQueryParams = Object.entries(queryParams)?.reduce(
    (result, [key, value]) => {
      if (value === null || value === undefined) {
        return result;
      }

      let param = `${key}=${value}`;
      if (url.includes('?') || result.includes('?')) {
        param = `&${param}`;
      } else {
        param = `?${param}`;
      }

      return `${result}${param}`;
    },
    ''
  );

  const path = `${url}${joinedQueryParams}`;

  let firebaseToken;
  if (typeof window !== 'undefined') {
    firebaseToken = await getIdToken();
  }

  const response = await fetch(path, {
    method,
    headers: await getHeaders(headers, token || firebaseToken),
    body: JSON.stringify(body),
    ...(cache ? { cache } : {}),
  });

  if (!response.ok) {
    throw new Error(
      `${response.status} - ${path} - ${JSON.stringify(await response.json())}`
    );
  }

  const res = await response.json();

  return res as T;
}

async function getHeaders(_headers?: any, token?: string) {
  const headers = {
    ..._headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const _token = token || (await auth.currentUser?.getIdToken());

  if (_token) {
    headers.Authorization = 'Bearer ' + _token;
  }

  return headers;
}

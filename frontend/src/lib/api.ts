import { getApiUrl, fetchWithCsrf } from './config';

export async function apiRequest(path: string, options: RequestInit = {}) {
  const url = getApiUrl(path);
  const response = await fetchWithCsrf(url, {
    ...options,
    credentials: 'include'
  });
  
  return response;
}

export async function apiGet(path: string) {
  return apiRequest(path, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function apiPost(path: string, body?: any) {
  return apiRequest(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
}

export async function apiPut(path: string, body?: any) {
  return apiRequest(path, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
}

export async function apiDelete(path: string) {
  return apiRequest(path, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
}

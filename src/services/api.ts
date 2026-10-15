import { GenerateResponse } from '../types/crochet';

// Configurable backend base URL:
// In Netlify, set VITE_BACKEND_URL to your Google Cloud Run service URL
// (e.g. "https://yarncraft-backend-xxxxxx.run.app").
// In local dev or Netlify redirect proxy, it defaults to "" (same-origin /api).
const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '');

export async function generateCrochetDesign(payload: {
  sketchImage: string;
  description: string;
}): Promise<GenerateResponse> {
  const url = `${BACKEND_URL}/api/generate-crochet`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMsg = `Server error (${response.status})`;
    try {
      const errData = await response.json();
      if (errData?.error) errorMsg = errData.error;
    } catch {
      // Ignore json parse error
    }
    throw new Error(errorMsg);
  }

  const data: GenerateResponse = await response.json();
  return data;
}

export async function checkBackendHealth(): Promise<{ status: string; hasApiKey: boolean }> {
  const url = `${BACKEND_URL}/api/health`;
  const response = await fetch(url);
  return response.json();
}

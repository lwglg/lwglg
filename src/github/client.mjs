import { API_BASE } from '../config.mjs';

const buildHeaders = (token) => ({
  Accept: 'application/vnd.github+json',
  'User-Agent': 'profile-stats',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export function createClient({ token, fetchImpl = fetch }) {
  const headers = buildHeaders(token);

  return {
    async get(path) {
      const response = await fetchImpl(`${API_BASE}${path}`, { headers });

      if (!response.ok) {
        throw new Error(`GitHub API ${path} failed with status ${response.status}`);
      }

      return response.json();
    },
  };
}

const baseUrl = (() => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string') {
    return envUrl.replace(/\/$/, '');
  }
  return 'http://localhost:4000/api';
})();

async function request(path, options = {}) {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  };

  if (config.body && typeof config.body !== 'string') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${baseUrl}${path}`, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = typeof data?.message === 'string' && data.message.trim().length > 0
        ? data.message
        : 'Não foi possível completar a operação.';
      throw new Error(message);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Falha ao comunicar com o servidor.');
  }
}

export function loginUser(credentials) {
  return request('/auth/login', {
    method: 'POST',
    body: credentials,
  });
}

export function registerUser(payload) {
  return request('/auth/register', {
    method: 'POST',
    body: payload,
  });
}

export function getApiBaseUrl() {
  return baseUrl;
}

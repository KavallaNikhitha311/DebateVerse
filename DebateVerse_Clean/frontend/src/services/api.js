const API_BASE = '/api';

export const fetchApi = async (endpoint, options = {}) => {
  const token = localStorage.getItem('debateverse_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data;
};

export const authApi = {
  login: (credentials) => fetchApi('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => fetchApi('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getMe: () => fetchApi('/auth/me'),
  updateProfile: (profileData) => fetchApi('/auth/me', { method: 'PUT', body: JSON.stringify(profileData) }),
  logout: () => fetchApi('/auth/logout', { method: 'POST' })
};

export const debatesApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchApi(`/debates${query ? `?${query}` : ''}`);
  },
  getById: (id) => fetchApi(`/debates/${id}`),
  create: (debateData) => fetchApi('/debates', { method: 'POST', body: JSON.stringify(debateData) }),
  join: (id, side) => fetchApi(`/debates/${id}/join`, { method: 'POST', body: JSON.stringify({ side }) }),
  submitArgument: (id, argData) => fetchApi(`/debates/${id}/arguments`, { method: 'POST', body: JSON.stringify(argData) }),
  vote: (id, argumentId) => fetchApi(`/debates/${id}/votes`, { method: 'POST', body: JSON.stringify({ argumentId }) }),
  getResults: (id) => fetchApi(`/debates/${id}/results`)
};

export const booksApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchApi(`/books${query ? `?${query}` : ''}`);
  },
  getById: (id) => fetchApi(`/books/${id}`),
  create: (bookData) => fetchApi('/books', { method: 'POST', body: JSON.stringify(bookData) }),
  update: (id, bookData) => fetchApi(`/books/${id}`, { method: 'PUT', body: JSON.stringify(bookData) }),
  delete: (id) => fetchApi(`/books/${id}`, { method: 'DELETE' })
};

export const analyticsApi = {
  getLeaderboard: () => fetchApi('/analytics/leaderboard'),
  getDashboard: () => fetchApi('/analytics/dashboard')
};

export const feedbackApi = {
  submit: (feedbackData) => fetchApi('/feedback', { method: 'POST', body: JSON.stringify(feedbackData) })
};

export const aiApi = {
  analyze: (analysisData) => fetchApi('/ai/analyze', { method: 'POST', body: JSON.stringify(analysisData) })
};
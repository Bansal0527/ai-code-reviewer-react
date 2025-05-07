
// Fetch CSRF token and set it for all requests
export const setupCSRF = async () => {
  try {
    const response = await api.get('/api/csrf-token');
    api.defaults.headers.common['X-CSRF-Token'] = response.data.csrfToken;
    return response.data.csrfToken;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
    return null;
  }
};

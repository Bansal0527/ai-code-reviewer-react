const fetchCsrfToken = async () => {
  try {
    const response = await fetch('/api/csrf-token');
    const data = await response.json();
    return data.csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    return null;
  }
};

export const addCsrfToken = async (headers = {}) => {
  const token = await fetchCsrfToken();
  if (token) {
    return {
      ...headers,
      'CSRF-Token': token
    };
  }
  return headers;
};

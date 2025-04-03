export const fetchCSRFToken = async () => {
  try {
    const response = await fetch('/csrf-token');
    const data = await response.json();
    return data.csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    return null;
  }
};

export const addCSRFToken = async (headers = {}) => {
  const token = await fetchCSRFToken();
  if (token) {
    return {
      ...headers,
      'CSRF-Token': token
    };
  }
  return headers;
};

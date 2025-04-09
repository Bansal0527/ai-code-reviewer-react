// Fetch CSRF token before making POST/PUT/DELETE requests
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

// Add CSRF token to request headers
export const addCSRFToken = async (headers = {}) => {
  const token = await fetchCSRFToken();
  return {
    ...headers,
    'CSRF-Token': token
  };
};

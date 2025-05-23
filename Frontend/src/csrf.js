// Helper function to get CSRF token from the API
export const fetchCsrfToken = async () => {
  try {
    const response = await fetch('/api/csrf-token');
    const data = await response.json();
    return data.csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    return null;
  }
};

// Add CSRF token to fetch requests
export const fetchWithCsrf = async (url, options = {}) => {
  const csrfToken = await fetchCsrfToken();
  
  const headers = {
    ...options.headers || {},
    'CSRF-Token': csrfToken,
  };
  
  return fetch(url, {
    ...options,
    headers,
  });
};

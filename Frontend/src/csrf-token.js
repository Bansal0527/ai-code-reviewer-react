// Helper function to get CSRF token from cookies
export const getCSRFToken = () => {
  return document.cookie.split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
};

// Add CSRF token to fetch requests
export const fetchWithCSRF = (url, options = {}) => {
  const csrfToken = getCSRFToken();
  const headers = {
    ...options.headers,
    'CSRF-Token': csrfToken,
  };
  
  return fetch(url, {
    ...options,
    headers,
  });
};

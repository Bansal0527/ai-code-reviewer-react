import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Function to set CSRF token
export const setCSRFToken = (token) => {
  api.defaults.headers.common['X-CSRF-Token'] = token;
};

// Initialize CSRF token
export const initCSRF = async () => {
  try {
    const response = await axios.get('/api/csrf-token', { withCredentials: true });
    setCSRFToken(response.data.csrfToken);
    return response.data.csrfToken;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
    return null;
  }
};

export default api;

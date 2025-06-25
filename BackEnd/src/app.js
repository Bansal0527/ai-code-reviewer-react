const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { doubleCsrf } = require('csrf');

const app = express();

// CSRF configuration
const {
  invalidCsrfTokenError,
  generateToken,
  validateRequest,
} = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET || 'your-csrf-secret-key-change-in-production',
  cookieName: '__Host-psifi.x-csrf-token',
  cookieOptions: {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000, // 1 hour
  },
  size: 64,
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
});

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CSRF token endpoint
app.get('/api/csrf-token', (req, res) => {
  const token = generateToken(req, res);
  res.json({ csrfToken: token });
});

// CSRF protection middleware for state-changing methods
app.use((req, res, next) => {
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    const error = validateRequest(req);
    if (error) {
      return res.status(403).json({ 
        error: 'CSRF token validation failed',
        message: 'Invalid or missing CSRF token'
      });
    }
  }
  next();
});

// Your existing routes go here
// Example protected route
app.post('/api/example', (req, res) => {
  res.json({ message: 'This route is now protected against CSRF attacks' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error === invalidCsrfTokenError) {
    return res.status(403).json({ 
      error: 'CSRF token validation failed',
      message: 'Invalid or missing CSRF token'
    });
  }
  next(error);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

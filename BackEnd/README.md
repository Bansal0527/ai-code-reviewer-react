
## CSRF Protection
This application uses CSRF protection to prevent Cross-Site Request Forgery attacks.
- Frontend requests that modify state must include a CSRF token
- Get a token from the `/api/csrf-token` endpoint
- Include the token in the 'CSRF-Token' header for all state-changing requests

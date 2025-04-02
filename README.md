# CSRF Protection
This application is protected against Cross-Site Request Forgery (CSRF) attacks using the csurf middleware.
The frontend automatically fetches a CSRF token on load and includes it in all subsequent requests.

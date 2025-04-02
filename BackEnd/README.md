# CSRF Protection

This application now uses CSRF protection middleware. For any forms or AJAX requests that modify data (POST, PUT, DELETE, etc.), you need to:

1. Get the CSRF token from the server by making a GET request to the root endpoint ("/")
2. Include the token in your requests using one of these methods:
   - As a hidden field named "_csrf" in forms
   - As an HTTP header "X-CSRF-Token" in AJAX requests
   - As a request parameter "_csrf"

Example with fetch:
```javascript
// First get the token
fetch('/')
  .then(response => response.json())
  .then(data => {
    // Then use it in subsequent requests
    fetch('/api/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': data.csrfToken
      },
      body: JSON.stringify({ /* your data */ })
    });
  });
```

const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const csrfProtection = csrf({ 
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
});

module.exports = {
  cookieParser,
  csrfProtection
};

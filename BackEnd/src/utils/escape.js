/**
 * Escapes HTML special characters in a string to prevent XSS attacks
 * @param {string} unsafe - The unsafe string that might contain HTML
 * @returns {string} - The escaped safe string
 */
const escapeHtml = (unsafe) => {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

module.exports = {
  escapeHtml
};

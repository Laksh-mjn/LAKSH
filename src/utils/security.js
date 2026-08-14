/**
 * Security & Sanitization Utilities for Laksh Mahajan Portfolio
 * Protects against XSS, input injection, and data tampering.
 */

// Strict regex for valid email format
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Strips HTML tags, script tags, event handlers, control characters,
 * and dangerous protocols to prevent XSS and DOM injection attacks.
 */
export function sanitizeString(input, maxLength = 500) {
  if (typeof input !== 'string') return '';
  
  // 1. Remove non-printable control characters (excluding newline, return, tab)
  let clean = input
    .split('')
    .filter((char) => {
      const code = char.charCodeAt(0);
      return (code >= 32 && code !== 127) || code === 10 || code === 13 || code === 9;
    })
    .join('');

  // 2. Strip potential HTML tags and script injections
  clean = clean.replace(/<[^>]*>?/gm, '');

  // 3. Strip dangerous protocol schemes like javascript:, data:, vbscript:
  clean = clean.replace(/javascript\s*:/gi, '');
  clean = clean.replace(/data\s*:/gi, '');
  clean = clean.replace(/vbscript\s*:/gi, '');

  // 4. Encode remaining dangerous characters for safe string display
  clean = clean
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // 5. Trim and enforce safe max length
  return clean.trim().slice(0, maxLength);
}

/**
 * Validates whether an email is strictly formatted and safe.
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length > 100 || trimmed.length < 5) return false;
  return EMAIL_REGEX.test(trimmed);
}

/**
 * Validates and safely prepares contact form payload.
 */
export function validateContactPayload(name, email, message) {
  const cleanName = sanitizeString(name, 80);
  const cleanEmail = email.trim().slice(0, 100);
  const cleanMessage = sanitizeString(message, 3000);

  const errors = [];
  if (!cleanName || cleanName.length < 2) {
    errors.push('Please enter a valid full name (at least 2 characters).');
  }
  if (!isValidEmail(cleanEmail)) {
    errors.push('Please enter a valid email address.');
  }
  if (!cleanMessage || cleanMessage.length < 5) {
    errors.push('Please enter a message (at least 5 characters).');
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: {
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
    },
  };
}

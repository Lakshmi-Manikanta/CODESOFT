// Basic email validation using regex
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Basic password strength check (min 6 characters)
export const isValidPassword = (password) => {
  return typeof password === 'string' && password.trim().length >= 6;
};

// Check if a string is non-empty
export const isNotEmpty = (value) => {
  return value && value.trim().length > 0;
};

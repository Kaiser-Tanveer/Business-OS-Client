export const isValidEmail = (
  email: string
) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isRequired = (
  value: string
) => {
  return value.trim().length > 0;
};
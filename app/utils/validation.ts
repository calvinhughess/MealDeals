export const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const re = /^\d{10}$/;
  return re.test(phone);
};

export const sanitizeInput = (input: string, type?: string): string => {
  if (type === 'email') {
    return input.replace(/[^a-zA-Z0-9@.]/g, '');
  }
  return input.replace(/[<>]/g, '');
};

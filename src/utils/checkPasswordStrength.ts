export const checkPassword = (password: string) => {
  let strength = '';
  if (password.length >= 8) {
    if (/[a-z]/.test(password)) strength += 'Lowercase ';
    if (/[A-Z]/.test(password)) strength += 'Uppercase ';
    if (/\d/.test(password)) strength += 'Number ';
    if (/[@$!%*?&#]/.test(password)) strength += 'Special Character';
  } else {
    strength = 'Password must be at least 8 characters';
  }
  return strength;
};

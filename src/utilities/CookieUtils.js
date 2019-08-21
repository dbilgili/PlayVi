export const getSession = () => {
  const value = localStorage.getItem('SESSION');
  return { Authorization: value };
};

export const clearSession = () => localStorage.removeItem('SESSION');

export const setSession = res => localStorage.setItem('SESSION', res.headers.authorization);

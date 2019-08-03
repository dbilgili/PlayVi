export const getCookie = () => {
  const cookieVal = document.cookie.split('=')[1];
  const headers = { Authorization: cookieVal };
  return headers;
};

export const clearCookie = () => {
  document.cookie = 'SESSION=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

export const setCookie = (res) => {
  document.cookie = `SESSION=${res.headers.authorization}; expires=${new Date(new Date().setFullYear(new Date().getFullYear() + 1))}; path=/`;
};

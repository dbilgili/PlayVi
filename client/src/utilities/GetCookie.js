const getCookie = () => {
  const cookieVal = document.cookie.split('=')[1];
  const headers = { Authorization: cookieVal };
  return headers;
};

export default getCookie;

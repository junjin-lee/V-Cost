import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';
const userKey = 'userinfo';

// Cookies will expire in 3 days.
const expires = { expires: 3 };

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, expires);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getUser() {
  const userstr = Cookies.get(userKey);
  return userstr ? JSON.parse(userstr) : null;
}

export function setUser(user) {
  let userstr = JSON.stringify(user);
  userstr = userstr || '';
  return Cookies.set(userKey, userstr, expires);
}

export function removeUser() {
  return Cookies.remove(userKey);
}

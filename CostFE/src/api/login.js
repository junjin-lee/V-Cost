import request from '@/utils/request';

let Base64 = require('js-base64').Base64;

export function login(username, password) {
  var fun = request({
    url: '/api/login',
    method: 'post',
    data: {
      username: username,
      password: Base64.encode(password)
    }
  });
  return fun;
}

export function getInfo() {
  return request({
    url: '/api/users/info?ts=' + Date.now(),
    method: 'get'
  });
}

export function logout(token) {
  return request({
    url: '/api/users/logout',
    method: 'post'
  });
}

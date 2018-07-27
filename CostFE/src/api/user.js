import request from '@/utils/request';

export function getUsers() {
  return request({
    url: '/api/users',
    method: 'get'
  });
}

export function addUser(user) {
  return request({
    url: '/api/users',
    method: 'post',
    data: user
  });
}

export function updateUser(user) {
  return request({
    url: '/api/users/' + user._id,
    method: 'put',
    data: user
  });
}

export function editInfo(user) {
  return request({
    url: '/api/users/editinfo/' + user.username,
    method: 'put',
    data: user
  });
}

export function deleteUser(id) {
  return request({
    url: '/api/users/' + id,
    method: 'delete'
  });
}

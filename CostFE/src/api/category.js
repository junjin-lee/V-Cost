import request from '@/utils/request';

export function getCategorys() {
  return request({
    url: '/api/category',
    method: 'get'
  });
}

export function addCategory(category) {
  return request({
    url: '/api/category',
    method: 'post',
    data: category
  });
}

export function updateCategory(category) {
  return request({
    url: '/api/category/' + category._id,
    method: 'put',
    data: category
  });
}

export function deleteCategory(id) {
  return request({
    url: '/api/category/' + id,
    method: 'delete'
  });
}

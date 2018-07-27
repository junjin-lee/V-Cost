import request from '@/utils/request';

// APIs for employee
export function getProfile() {
  return request({
    url: `/api/resources/profile`,
    method: 'get'
  });
}

export function updateProfile(para) {
  return request({
    url: '/api/resources/profile',
    method: 'post',
    data: para
  });
}

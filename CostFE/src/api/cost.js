import request from '@/utils/request';

export function getCosts(query) {
  return request({
    url: '/api/cost',
    method: 'get',
    data: query
  });
}

export function addCost(cost) {
  return request({
    url: '/api/cost',
    method: 'post',
    data: cost
  });
}

export function updateCost(cost) {
  return request({
    url: '/api/cost/' + cost._id,
    method: 'put',
    data: cost
  });
}

export function deleteCost(id) {
  return request({
    url: '/api/cost/' + id,
    method: 'delete'
  });
}

export function exportCosts(query) {
  return request({
    url: '/api/cost/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  });
}

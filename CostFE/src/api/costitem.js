import request from '@/utils/request';

export function getCostitems() {
  return request({
    url: '/api/costitem',
    method: 'get'
  });
}

export function addCostitem(costitem) {
  return request({
    url: '/api/costitem',
    method: 'post',
    data: costitem
  });
}

export function updateCostitem(costitem) {
  return request({
    url: '/api/costitem/' + costitem._id,
    method: 'put',
    data: costitem
  });
}

export function deleteCostitem(id) {
  return request({
    url: '/api/costitem/' + id,
    method: 'delete'
  });
}

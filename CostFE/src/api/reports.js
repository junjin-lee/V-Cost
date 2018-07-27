import request from '@/utils/request';

export function getItemStatistics(query) {
  return request({
    url: '/api/report/getItemStatistics',
    method: 'get',
    data: query
  });
}

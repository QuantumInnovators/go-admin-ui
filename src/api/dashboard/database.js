import request from '@/utils/request'

// 查询Sequence列表
export function listClass(data) {
  return request({
    url: '/api/v1/sequence/search',
    data: data,
    method: 'post'
  })
}

export function searchList(data) {
  return request({
    url: '/api/v1/sequence/search',
    method: 'post',
    data: data
  })
}

export function getCategoryList(query) {
  return request({
    url: '/api/v1/category',
    method: 'get',
    params: query
  })
}

export function getDomainList() {
  return request({
    url: '/api/v1/logic/classList',
    method: 'get'
  })
}

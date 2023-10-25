import request from '@/utils/request'

// 查询Meta列表
export function listMeta(query) {
  return request({
    url: '/api/v1/meta',
    method: 'get',
    params: query
  })
}

// 查询Meta详细
export function getMeta(id) {
  return request({
    url: '/api/v1/meta/' + id,
    method: 'get'
  })
}

// 新增Meta
export function addMeta(data) {
  return request({
    url: '/api/v1/meta',
    method: 'post',
    data: data
  })
}

// 修改Meta
export function updateMeta(data) {
  return request({
    url: '/api/v1/meta/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除Meta
export function delMeta(data) {
  return request({
    url: '/api/v1/meta',
    method: 'delete',
    data: data
  })
}


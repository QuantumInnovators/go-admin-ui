import request from '@/utils/request'

// 查询Projects列表
export function listProjects(query) {
  return request({
    url: '/api/v1/projects',
    method: 'get',
    params: query
  })
}

// 查询Projects详细
export function getProjects(id) {
  return request({
    url: '/api/v1/projects/' + id,
    method: 'get'
  })
}

// 新增Projects
export function addProjects(data) {
  return request({
    url: '/api/v1/projects',
    method: 'post',
    data: data
  })
}

// 修改Projects
export function updateProjects(data) {
  return request({
    url: '/api/v1/projects/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除Projects
export function delProjects(data) {
  return request({
    url: '/api/v1/projects',
    method: 'delete',
    data: data
  })
}


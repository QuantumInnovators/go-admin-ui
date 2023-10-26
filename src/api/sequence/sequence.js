import request from '@/utils/request'

// 查询Sequence列表
export function listSequence(query) {
  return request({
    url: '/api/v1/sequence',
    method: 'get',
    params: query
  })
}

// 查询Sequence详细
export function getSequence(id) {
  return request({
    url: '/api/v1/sequence/' + id,
    method: 'get'
  })
}

// 查询Sequence详细
export function getSequenceByClassId(classId) {
  return request({
    url: '/api/v1/sequence/class' + classId,
    method: 'get'
  })
}

// 新增Sequence
export function addSequence(data) {
  return request({
    url: '/api/v1/sequence',
    method: 'post',
    data: data
  })
}

// 修改Sequence
export function updateSequence(data) {
  return request({
    url: '/api/v1/sequence/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除Sequence
export function delSequence(data) {
  return request({
    url: '/api/v1/sequence',
    method: 'delete',
    data: data
  })
}

// 更新Sequence
export function uploadSequenceByFile(data) {
  console.log('data' + data.path)
  return request({
    url: '/api/v1/sequence/uploadFile',
    method: 'post',
    data: data
  })
}

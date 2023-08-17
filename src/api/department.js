
import request from '@/utils/request'
// 查询企业的部门列表
export function getDepartment() {
    return request({
      url: '/company/department',
      method: 'get',
    })
  }

export function getDepartments(data) {
    return request({
      url: '/company/department',
      method: 'post',
      data
    })
  }
  
// 获取员工简单列表
export function getManagerList() {
    return request({
      url: '/sys/user/simple',
    })
  }
  
  // 根据ID查询部门详情
export function getDepartmentDetail(data) {
  return request({
    url: '/company/department/'+data,
    method:'get',
  })
}

  // 根据ID修改部门详情
export function getDepartmentDetails(data) {
  return request({
    url: `/company/department/${data.id}`,
    method:'PUT',
  })
}


  // 根据ID删除部门
  export function delDepartment(data) {
    return request({
      url: `/company/department/${data.id}`,
      method:'DELETE',
    })
  }
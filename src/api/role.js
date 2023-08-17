import request from '@/utils/request'
// 获取所有角色列表
export function getRoleList(data) {
    return request({
        url: '/sys/role?page='+data.page+'&pagesize='+data.pagesize,
        method: 'get',
    })
}
// 根据ID更新角色
export function upDateRole(data) {
    return request({
        url: '/sys/role/'+data.id,
        method: 'PUT',
        data
    })
}

// 添加角色
export function AddRole(data) {
    return request({
        url: '/sys/role',
        method: 'post',
        data
    })
}


// 删除角色
export function DelRole(data) {
    return request({
        url: `/sys/role/${data.id}`,
        method: 'DELETE',
    })
}


// 获取角色信息 /sys/role/list/enabled

export function getRolesInfo(data) {
    return request({
        url: '/sys/role/list/enabled',
        method: 'get',
    })
}

// 给角色分配权限  /sys/role/assignPrem


export function assignPremRolesInfo(data) {
    return request({
        url: '/sys/user/assignRoles',
        method: 'PUT',
        data
    })
}
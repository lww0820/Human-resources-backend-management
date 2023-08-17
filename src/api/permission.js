import request from '@/utils/request'

// 获取权限
export function getPermission(){
    return request({
        url:'/sys/permission',
        method:'get'
    })
}
// 添加权限
export function AddPermissionApi(data){
    return request({
        url:'/sys/permission',
        method:'post',
        data
    })
}
// 获取权限详情
export function PermissionInfoApi(data){
    return request({
        url:'/sys/permission/'+data.id,
        method:'get',
    })
}

// 删除权限
export function delPermissionApi(data){
    return request({
        url:'/sys/permission/'+data.id,
        method:'delete',
    })
}
// 编辑权限
export function EditPermissionApi(data){
    return request({
        url:'/sys/permission/'+data.id,
        method:'put',
        data
    })
}

// 查询角色详情
export function getRolesInfo(data){
    return request({
        url:'/sys/role/'+data.id,
        method:'get'
    })
}

export function getAssignPrem(data){
    return request({
        url:'/sys/role/assignPrem',
        method:'PUT',
        data
    })
}
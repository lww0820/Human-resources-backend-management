import request from '@/utils/request'

// 获取员工列表
export function employeeList(params){
    return request({
        url:'/sys/user',
        method:'get',
        params
    })
}

// 获取员工基本信息  /sys/user/{id}  GET
export function employeeInfo(params){
    return request({
        url:`sys/user/${params.id}`,
        method:'get',
    })
}

// 新增员工   /sys/user  POST
export function Addemployee(data){
    return request({
        url:`/sys/user`,
        method:'POST',
        data
    })
}
// 编辑员工   /sys/user  put
export function Eidtemployee(data){
    return request({
        url:`/sys/user/`+data.id,
        method:'put',
        data
    })
}
// 导出员工信息表
export function ExportEmployee(){
    return request ({
        url:'/sys/user/export',
        responseType:'blob'
    })
}


// 导入员工信息表
export function ImportEmployee(data){
    return request ({
        url:'/sys/user/import',
        method:'POST',
        data   //formData类型  因为要上传文件
    })
}


//下载模板 /sys/user/import/template
export function DownloadTemplate(data){
    return request ({
        url:'/sys/user/import/template',
        responseType:'blob'
    })
}

// 删除员工
export function delEmployee(data){
    return request ({
        url:'/sys/user/'+data.id,
        method:'DELETE',
        data
    })
}
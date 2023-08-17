import Layout from '@/layout'

export default {
    path: '/employee',
    name: "employee",
    redirect: '/employee',  // 重定向:重新指向其它path,会改变网址
    component: Layout,
    children: [
        {
            path: "",
            name: "Employee",
            component: () => import('@/views/employee/index'),
            meta: {
                icon: "example",
                title: '员工'
            }
        }, {
            path: "detail/:id?",
            name: "detail",
            component: () => import('@/views/employee/detail'),
            hidden:true
        }
    ]
}
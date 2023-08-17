import Layout from '@/layout'

export default {
    path: '/department',
    name: "department",
redirect: '/department',  // 重定向:重新指向其它path,会改变网址
    component: Layout,
    children: [
        {
            path: "",
            name: "Department",
            component: () => import('@/views/department/index'),
            meta: {
                icon: "tree",
                title: '组织'
            }
        }
    ]
}
import Layout from '@/layout'

export default {
    path: '/permission',
    name: "permission",
redirect: '/permission',  // 重定向:重新指向其它path,会改变网址
    component: Layout,
    children: [
        {
            path: "",
            name: "Permission",
            component: () => import('@/views/permission/index'),
            meta: {
                icon: "nested",
                title: '权限'
            }
        }
    ]
}
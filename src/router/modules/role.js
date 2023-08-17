import Layout from '@/layout'

export default {
    path: '/role',
    name: "role",
    redirect: '/role',  // 重定向:重新指向其它path,会改变网址
    component: Layout,
    children: [
        {
            path: "",
            name: "Role",
            component: () => import('@/views/role/index'),
            meta: {
                icon: "user",
                title: '角色'
            }
        }
    ]
}
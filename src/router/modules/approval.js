import Layout from '@/layout'

export default {
    path: '/approval',
    name: "approval",
    redirect: '/approval',  // 重定向:重新指向其它path,会改变网址
    component: Layout,
    children: [
        {
            path: "",
            name: "Approval",
            component: () => import('@/views/approval/index'),
            meta: {
                icon: "password",
                title: '审批'
            }
        }
    ]
}
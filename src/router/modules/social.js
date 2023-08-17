import Layout from '@/layout'

export default {
    path: '/social',
    name: "social",
    component: Layout,
    redirect: '/social',  // 重定向:重新指向其它path,会改变网址
    children: [
        {
            path: "",
            name: "Social",
            component: () => import('@/views/social/index'),
            meta: {
                icon: "table",
                title: '社保'
            }
        }
    ]
}
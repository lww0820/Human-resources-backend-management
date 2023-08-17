import Layout from '@/layout'

export default {
    path: '/salary',
    name: "salary",
    redirect: '/salary',
    component: Layout,
    children: [
        {
            path: "",
            name: "Salary",
            component: () => import('@/views/salary/index'),
            meta: {
                icon: "link",
                title: '工资'
            }
        }
    ]
}
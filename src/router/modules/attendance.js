import Layout from '@/layout'

export default {
    path: '/attendance',
    name: "attendance",
    redirect: '/attendance',  // 重定向:重新指向其它path,会改变网址
    component: Layout,
    children: [
        {
            path: "",
            name: "Attendance",
            component: () => import('@/views/attendance/index'),
            meta: {
                icon: "form",
                title: '考勤'
            }
        }
    ]
}
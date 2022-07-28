export default {
    path: '/user',
    redirect: '/user_user',
    component: () => import('@/views/layout'),
    meta: { title: '会员管理' },
    children: [
        {
            path: '/user_user',
            component: () => import('@/views/user/user'),
            meta: { title: '会员列表' },
        },
    ]
}
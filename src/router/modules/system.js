export default {
    path: '/system',
    redirect: '/system_menu',
    component: () => import('@/views/layout'),
    meta: { title: '系统管理' },
    children: [
        {
            path: '/system_menu',
            component: () => import('@/views/system/menu'),
            meta: { title: '菜单管理' },
        },
        {
            path: '/system_role',
            component: () => import('@/views/system/role'),
            meta: { title: '角色管理' },
        },
        {
            path: '/system_user',
            component: () => import('@/views/system/user'),
            meta: { title: '用户管理' },
        },
    ]
}
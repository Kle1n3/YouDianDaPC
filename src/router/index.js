import Vue from "vue";
import VueRouter from "vue-router";
import UserRoute from './modules/user'
import ContentRoute from './modules/content'
import SystemRoute from './modules/system'


Vue.use(VueRouter)

const constRoute = [
    {
        path: '/',
        redirect: '/dashboard',
        component: () => import('@/views/layout'),
        meta: { title: '优点达' },
        children: [
            {
                path: '/dashboard',
                component: () => import('@/views/dashboard'),
                meta: { title: '欢迎您' },
            },
            /* {
                path: '/user_user',
                component: () => import('@/views/user/user'),
                meta: { title: '会员列表' },
            }, */
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login'),
        meta: { title: '登录' },
    },
    {
        path: '/404',
        component: () => import('@/views/notfound'),
    },
    {
        path: '/*',
        redirect: '/404',
    },
]

const asyncRoute = [UserRoute, ContentRoute, SystemRoute]

const router = new VueRouter({
    routes: [...asyncRoute, ...constRoute,],
})

export default router
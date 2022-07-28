import router from "@/router";
import { getToken } from '@/utlis/auth'
import store from '@/store'

const whiteList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
    if (getToken()) {
        if (to.path === '/login') {
            next('/')
        }
        else {
            if (!store.getters['user/userId']) {
                await store.dispatch('user/getUserProfileAction')
            }
            next()
        }
    }
    else {
        if (whiteList.includes(to.path)) {
            next()
        }
        else {
            next('/login')
        }
    }
})
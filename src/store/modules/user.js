import { loginApi, getUserProfileApi } from '@/api/User'
import { setToken, getToken, removeToken } from '@/utlis/auth'

export default {
    namespaced: true,
    state: {
        token: getToken(),
        userInfo: {},
    },
    getters: {
        userId: state => state.userInfo.id,
        name: state => state.userInfo.name,
    },
    mutations: {
        setToken(state, data) {
            state.token = data
            setToken(data)
        },
        setUserInfo(state, data) {
            state.userInfo = data
        },
        logout(state) {
            state.token = {}
            removeToken()
        },
    },
    actions: {
        async loginAction(context, data) {
            const res = await loginApi(data)
            context.commit('setToken', res.token)
            console.log(res);
        },
        async getUserProfileAction({ commit }) {
            const { userInfo } = await getUserProfileApi()
            commit('setUserInfo', userInfo)
        },
    },
}
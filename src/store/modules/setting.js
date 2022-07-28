export default {
    namespaced: true,
    state: { isCollapse: false, },
    getters: {},
    mutations: {
        changeCollapse(state) {
            state.isCollapse = !state.isCollapse
        },
    },
    actions: {},
}
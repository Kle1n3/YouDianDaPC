import service from "@/utlis/request";

export const loginApi = data => service({
    method: 'post',
    url: '/admin/index/login',
    data,
})

export const getUserProfileApi = () => service({
    method: 'post',
    url: '/admin/index/profile',
})
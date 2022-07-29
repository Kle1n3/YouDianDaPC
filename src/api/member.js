import service from "@/utlis/request";

export const getMemberListApi = params => service({
    url: '/admin/ydd_user/list',
    params,
})

export const addMemberApi = data => service({
    method: 'post',
    url: '/admin/ydd_user/add',
    data,
})

export const editMemberApi = data => service({
    method: 'post',
    url: '/admin/ydd_user/update',
    data,
})

export const getMemberInfoApi = params => service({
    url: '/admin/ydd_user/rowInfo',
    params,
})

export const delMemberApi = params => service({
    url: '/admin/ydd_user/del',
    params,
})
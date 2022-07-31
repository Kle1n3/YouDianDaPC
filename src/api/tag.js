import service from '@/utlis/request'

export const getTagListApi = params => service({
    url: '/admin/ydd_tag/list',
    params,
})

export const addTagApi = data => service({
    method: 'post',
    url: '/admin/ydd_tag/add',
    data,
})

export const editTagApi = data => service({
    method: 'post',
    url: '/admin/ydd_tag/update',
    data,
})

export const getTagRowInfoApi = params => service({
    url: '/admin/ydd_tag/rowInfo',
    params,
})
export const delTagApi = params => service({
    url: '/admin/ydd_tag/del',
    params,
})

export const getTagAllApi = () => service({
    url: '/admin/ydd_tag/all',
})
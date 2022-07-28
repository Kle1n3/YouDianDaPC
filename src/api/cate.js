import service from '@/utlis/request'

export const getCateListApi = params => service({
    url: '/admin/ydd_cate/list',
    params,
})

export const addCateApi = data => service({
    method: 'post',
    url: '/admin/ydd_cate/add',
    data,
})

export const editCateApi = data => service({
    method: 'post',
    url: '/admin/ydd_cate/update',
    data,
})

export const getCateRowInfoApi = params => service({
    url: '/admin/ydd_tag/rowInfo',
    params,
})
export const delCateApi = params => service({
    url: '/admin/ydd_cate/del',
    params,
})
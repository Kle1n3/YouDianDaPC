import service from '@/utlis/request'

export const getArticleListApi = params => service({
    url: '/admin/ydd_article/list',
    params,
})

export const addArticleApi = data => service({
    method: 'post',
    url: '/admin/ydd_article/add',
    data,
})

export const editArticleApi = data => service({
    method: 'post',
    url: '/admin/ydd_article/update',
    data,
})

export const getArticleRowInfoApi = params => service({
    url: '/admin/ydd_article/rowInfo',
    params,
})
export const delArticleApi = params => service({
    url: '/admin/ydd_article/del',
    params,
})

export const uploadPicApi = (data) => service({
    method: 'post',
    url: '/admin/common/upload?type=images',
    data,
})

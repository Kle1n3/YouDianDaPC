export default {
    path: '/content',
    redirect: '/content_cate',
    component: () => import('@/views/layout'),
    meta: { title: '系统管理' },
    children: [
        {
            path: '/content_cate',
            component: () => import('@/views/content/cate'),
            meta: { title: '分类管理' },
        },
        {
            path: '/content_tag',
            component: () => import('@/views/content/tag'),
            meta: { title: '标签管理' },
        },
        {
            path: '/content_article',
            component: () => import('@/views/content/article'),
            meta: { title: '文章管理' },
        },
        {
            path: '/content_article/add',
            component: () => import('@/views/content/article/addArticle'),
            meta: { title: '添加文章' },
        },
        {
            path: '/content_article/edit/:id',
            component: () => import('@/views/content/article/addArticle'),
            meta: { title: '修改文章' },
        },
    ]
}
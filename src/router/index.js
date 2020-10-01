import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout'

Vue.use(Router)

const routes = [
    {
        path: '/',
        redirect: '/login',
        
    },
    {
        path: '/login',
        component: () => import('../views/login')
    },
    {
        path: '/list',
        component: Layout,
        title: '列表',
        children: [{
            path: '/list',
            component: () => import('../views/list')
        }]
    },
    {
        path: '/editor',
        component: Layout,
        title:'新增/编辑',
        children: [{
            path: '/editor',
            component: () => import('../views/editor'),
        }]
    }
]

const router = new Router({
    routes
})

// 全局前置守卫，只有登陆之后才可进入页面
router.beforeEach((to, from, next) => {
    const hasLogin = localStorage.getItem("token") || false
    if(to.path === '/login') {
        next()
    } else {
        if(hasLogin) {
            next()
        } else {
            next('/login')
        }
    }
})

export default router
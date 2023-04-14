import { createWebHistory,createRouter,RouteRecordRaw } from 'vue-router'

import  routesI  from './routes' 
const routes:RouteRecordRaw[] = [
    {
        path: '/',
        redirect: { path: '/layout' },
        
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue'),
       
    },
     {
        path: '/A',
        name: 'A',
        component: () => import('../components/A'),
       
    },
    ...routesI
    // ...routesI as RouteRecordRaw[]
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    
    const token = localStorage.getItem('token')
    if (!token) {
        if (to.name === 'login') {
            next()
        }
        else {
            next('/login')
        }
    } else {
        // 断言类型
        document.title = to.meta.title as string
        next()
    }
})
export default router
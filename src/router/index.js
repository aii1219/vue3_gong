import { createRouter,createWebHistory,createWebHashHistory } from 'vue-router'

const login = () =>import('../view/login.vue')
const search = () =>import('../view/search.vue')
const routes = [
    {
        path: '/',
        component:login
    },
    {
        path: '/search',
        component:search
    }
]

const router = createRouter({
    // history: createWebHistory(),
    history:createWebHashHistory(),
    routes,
})

export default router;


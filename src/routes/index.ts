import {createRouter,createWebHistory} from "vue-router";
import {useUser} from "../stores/user.ts";
import Login from '@/views/auth/Login.vue'
import Dashboard from '@/views/dashboard/DashboardLayout.vue';
import Index from '@/views/dashboard/Index.vue';

const routes =[
    {
        path:'/',
        beforeEnter: (_to, _from, next) => {
            useUser().getToken ? next('/dashboard') : next()
        },
        name:'login',
        component: Login,
    },
    {
        path:'/dashboard',
        name:'dashboard',
        component: Dashboard,
        beforeEnter: (_to,_before,next) => {
            useUser().getToken ? next() : next('/')
        },
        children:[
            {
                path:'',
                name:'dashboard.index',
                component:Index,
            },
        ],

    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
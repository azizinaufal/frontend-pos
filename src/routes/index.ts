import {createRouter,createWebHistory} from "vue-router";
import {useUser} from "../stores/user.ts";
import Login from '@/views/auth/Login.vue'
import Dashboard from '@/views/dashboard/Dashboard.vue'

const routes =[
    {
        path:'/',
        beforeEnter:(_to, _from, next) => {
            useUser().getToken ? next('/dashboard'):next();
        },
        name:'login',
        component: Login,
    },
    {
      path:'/dashboard',
        beforeEnter:(_to, _from, next) => {
            useUser().getToken ? next():next('/');
        },
        name:'dashboard',
        component: Dashboard,
    },

];

const router = createRouter({
    history:createWebHistory(),
    routes,
});

export default router;
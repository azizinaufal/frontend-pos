import {createRouter,createWebHistory} from "vue-router";
import {useUser} from "../stores/user.ts";
import Index from '@/views/LandingPage/Index.vue';
import Register from '@/views/auth/Register.vue';
import Login from '@/views/auth/Login.vue';
import DashboardLayout from '@/views/dashboard/DashboardLayout.vue';
import Dashboard from '@/views/dashboard/Index.vue';
import Categories from '@/views/categories/Categories.vue';
import Products from '@/views/products/Product.vue';
import Customers from '@/views/customers/Customer.vue';
import Profils from '@/views/profil/Profil.vue';
import Transactions from '@/views/transactions/Transaction.vue';
import Print from '@/views/transactions/print/Print.vue';
import Sales from '@/views/sales/Sales.vue';
import Profits from '@/views/profits/Profits.vue';

const routes =[
    {
        path:'/',
        name:'index',
        component:Index,
    },
    {
        path:'/login',
        beforeEnter: (_to, _from, next) => {
            useUser().getToken ? next('/dashboard') : next()
        },
        name:'login',
        component: Login,
    },
    {
        path:'/register',
        name:'register',
        component:Register,
    },
    {
        path:'/dashboard',
        name:'dashboard',
        component: DashboardLayout,
        beforeEnter: (_to,_before,next) => {
            useUser().getToken ? next() : next('/')
        },
        children:[
            {
                path:'',
                name:'dashboard.index',
                component:Dashboard,
            },
            {
                path:'/categories',
                name:'categories.index',
                component:Categories,
            },
            {
                path:'/products',
                name:'products.index',
                component:Products,
            },
            {
                path:'/customers',
                name:'customer.index',
                component:Customers,
            },
            {
                path:'/users',
                name:'user.index',
                component:Profils,
            },
            {
                path:'/transactions',
                name:'transaction.index',
                component:Transactions,
            },
            {
                path:'/transactions/print',
                name:'transaction.print',
                component:Print,
            },
            {
                path:'/sales',
                name:'sales.index',
                component:Sales,
            },
            {
                path:'/profits',
                name:'profit.index',
                component:Profits,
            },
        ],

    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
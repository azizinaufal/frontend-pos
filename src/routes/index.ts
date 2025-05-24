import {createRouter,createWebHistory} from "vue-router";
import {useUser} from "../stores/user.ts";
import Login from '@/views/auth/Login.vue'
import Dashboard from '@/views/dashboard/DashboardLayout.vue';
import Index from '@/views/dashboard/Index.vue';
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
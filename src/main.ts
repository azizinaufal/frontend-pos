import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import {createPinia} from 'pinia';
import router from './routes';
import VueApexCharts from 'vue3-apexcharts';
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";


const pinia =createPinia();

const app = createApp(App);

app.use(pinia).use(router).use(VueApexCharts).use(VueAwesomePaginate);
app.mount('#app');

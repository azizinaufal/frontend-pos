import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import {createPinia} from 'pinia';
import router from './routes';
import VueApexCharts from 'vue3-apexcharts';
const pinia =createPinia();

const app = createApp(App);

app.use(pinia).use(router).use(VueApexCharts);
app.mount('#app');

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import Api from '@/services/api.ts';
import Cookies from 'js-cookie';
import ProductList from './components/ProductList.vue';
import {VueAwesomePaginate} from "vue-awesome-paginate";
import CategoryList from './components/CategoryList.vue';
import OrderItemList from './components/OrderItemList.vue';
import {moneyFormat} from "@/utils/moneyFormat.ts";
import {Search} from 'lucide-vue-next';
import Payment from './components/Payment.vue';


const products = ref([]);
const barcode = ref("");
const searchInput = ref(null);
const categories= ref([]);
const currentCategoryId = ref(null);
const carts = ref([]);
const totalCarts = ref(0);
const pagination = ref({
  currentPage: 1,
  perPage: 1,
  total: 0
});

const token  = Cookies.get('token');

const fetchCategories = async () => {
  if(token){
    Api.defaults.headers.common['Authorization'] = token;
    await Api.get(`/api/categories-all`)
    .then(response=>{
      categories.value = response.data.data;
    });
  }
};

const fetchProductByCategoryID = async (categoryId, pageNumber) => {
    if(token){
      const page = pagination.value.currentPage ||  pageNumber;
      Api.defaults.headers.common['Authorization'] = token;
      await Api.get(`/api/products-by-category/${categoryId}?page=${page}&limit=9`)
          .then(response=>{
            products.value = response.data.data;
            pagination.value={
              currentPage: response.data.pagination.currentPage,
              perPage: response.data.pagination.perPage,
              total: response.data.pagination.total
            };
          });
    }
};

const fetchProducts = async (pageNumber) => {
  if(token){
    const page =  pagination.value.currentPage || pageNumber;
    Api.defaults.headers.Authorization = token;

    await Api.get(`/api/products?page=${page}&limit=9`)
        .then((response)=>{
          products.value = response.data.data;
          pagination.value = {
            currentPage: response.data.pagination.currentPage,
            perPage: response.data.pagination.perPage,
            total: response.data.pagination.total,
          };
        });
  }
};

const fetchProductByBarcode = async (barcode: string) => {
  if(token){
    Api.defaults.headers.common["Authorization"] = token;

    await Api.post(`/api/products-by-barcode`, {barcode})
    .then((response)=>{
      products.value = response.data.data;
    });
  }
};

const fetchCarts = async () => {
  if(token){
    Api.defaults.headers.common['Authorization'] = token;
    await Api.get(`/api/carts`)
        .then(response=>{
          carts.value = response.data.data;
          totalCarts.value =response.data.totalPrice
        });

  }
};

const searchHandler = (e) =>{
  console.log("Barcode:", barcode.value);
  barcode.value = e.target.value;
  fetchProductByBarcode(e.target.value);
}

onMounted(() => {
  fetchProducts(1);
  if(searchInput.value){
    searchInput.value.focus();
  }
  fetchCategories();

  fetchCarts();
});


</script>

<template>
  <div class="flex  gap-4 m-6">
    <div class="w-[800px] flex flex-col gap-4 mt-8">
      <form @submit.prevent="searchHandler">
        <div class="relative w-full flex">
          <div class="absolute p-2">
            <Search/>
          </div>

          <input type="text"
                 placeholder="Scan Barcode..."
                 v-model="barcode"
                 ref="searchInput"
                 @input="searchHandler"
                 class="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </form>
      <CategoryList :categories="categories" :fetchProducts="fetchProducts" :fetchProductByCategoryID="fetchProductByCategoryID" @update:currentCategoryId="(newId) => currentCategoryId = newId"/>
      <ProductList :products="products" :fetchCarts="fetchCarts" />
    </div>

    <div class="mt-8 bg-white shadow-sm w-[350px] h-[600px] flex flex-col rounded-xl border py-4 shadow-sm">

        <h5 class="font-bold mx-4 ">ORDER ITEMS</h5>
        <div class="border-b-4 border-gray-100 my-2"></div>
        <div class="flex-1 overflow-auto px-4">
          <OrderItemList :carts="carts" :fetchCarts="fetchCarts" />
        </div>

        <div class="border-b-4 border-gray-100 mt-6 "></div>
        <div class="font-bold rounded-lg flex justify-between items-center p-2 m-2 bg-white">
          <h4 class="text-xs ">Total ({{ carts.length }} Items)</h4>
          <h4 class="text-sm">{{ moneyFormat(totalCarts) }}</h4>
        </div>
      <div class=" flex item-center justify-center ">
        <Payment/>
      </div>
    </div>

    </div>

  <div class="text-center">
    <VueAwesomePaginate :total-items="pagination.total" :items-per-page="pagination.perPage" :max-pages-shown="2" v-model="pagination.currentPage" @click="fetchProducts"
                        :container-class="'paginate-container'"
                        :page-class="'paginate-buttons'"
                        :active-page-class="'active'"/>
  </div>
</template>


<script setup lang="ts">
import {ref,onMounted} from 'vue';
import Api from '@/services/api.ts';
import Cookies from 'js-cookie';
import {getImageUrl} from "@/utils/getImageUrl.ts";
import {moneyFormat} from "@/utils/moneyFormat.ts";
import Barcode from '../components/Barcode.vue';
import CreateProduct from './Create.vue';
import EditProduct from './Edit.vue';
import {Input} from "@/components/ui/input";
import DeleteButton from '@/views/components/Delete.vue';

import {VueAwesomePaginate} from "vue-awesome-paginate";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";

const products = ref([]);
const pagination = ref({
  currentPage:1,
  perPage:5,
  total:0
});
const keywords =ref("");

const fetchData = async (pageNumber = 1,search="") => {
  const token = Cookies.get('token');
  if(token){
    Api.defaults.headers.common["Authorization"] = token;
    try {
      const response = await Api.get(`/api/products?page=${pageNumber}&search=${search}`);
      products.value = response.data.data;
      pagination.value={
        currentPage:response.data.pagination.currentPage,
        perPage:response.data.pagination.perPage,
        total:response.data.pagination.total,
      };
    }catch(error){
      console.error("Error fetching data", error);
    }
  }else{
    console.log("Token tidak valid");
  }
};

onMounted(() => {
  fetchData();
});



const searchHandler = ()=>{
  fetchData(1,keywords.value);
};

const handleKeyDown = (e)=>{
  if(e.key==="Enter"){
    searchHandler();
  }
};

</script>

<template>
  <div class="flex flex-col justify-between m-6">
    <div class="flex flex-col">
      <p class="font-sans text-gray-600 text-s">HALAMAN</p>
      <h2 class="font-bold text-2xl">PRODUCTS</h2>
    </div>
    <div class="my-8 flex items-center ">
      <CreateProduct :fetch-data="fetchData" />
      <Input id="search" type="text" placeholder="Cari Produk" class="pl- 10" v-model="keywords" @keydown="handleKeyDown" />
      <Button class="ml-2 bg-blue-600 rounded-md h-8 hover:bg-sky-700" @click="searchHandler">Cari</Button>
    </div>
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-6">Barcode</TableHead>
            <TableHead>Nama Product</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Harga Beli</TableHead>
            <TableHead>Harga Jual</TableHead>
            <TableHead>Stok</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(product, index) in products" :key="index">
            <TableCell>
              <Barcode :value="product.barcode" :format="'CODE39'" :line-color="'#000'" width="1" height="20" font-size="10" />
            </TableCell>
            <TableCell>
              <div class="flex items-center py-1">
                <img :src="getImageUrl(product.image)" :alt="product.name" class="w-10 h-10 rounded-full object-cover mr-3"/>
                <div>
                  <p class="font-medium text-gray-900">{{ product.title }}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <p class="text-gray-600">{{ product.category.name }}</p>
            </TableCell>
            <TableCell>
              <p class="text-gray-600">{{moneyFormat(product.buy_price) }}</p>
            </TableCell>
            <TableCell>
              <p class="text-gray-600">{{moneyFormat(product.sell_price) }}</p>
            </TableCell>
            <TableCell>
              <p class="text-gray-600">{{product.stock }}</p>
            </TableCell>
            <TableCell>
              <div class="flex space-x-2">
              <EditProduct :fetch-data="fetchData" :productId="product.id" />
              <DeleteButton :id="product.id" :fetch-data="fetchData" endpoint="/api/products"  />
              </div>
            </TableCell>
          </TableRow>
          <TableRow v-if="!products.length">
            <TableCell colspan="3" class="text-center">
              <div class="bg-red-100 text-red-600 p-4 rounded-md">
                Data Belum Tersedia!
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <div class="text-end">
      <VueAwesomePaginate :total-items="pagination.total" :items-per-page="pagination.perPage" :max-pages-shown="2" v-model="pagination.currentPage" @click="fetchData"
                          :container-class="'paginate-container'"
                          :page-class="'paginate-buttons'"
                          :active-page-class="'active'"/>
    </div>
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
import {defineProps} from 'vue';
import {getImageUrl} from "@/utils/getImageUrl.ts";
import {moneyFormat} from "@/utils/moneyFormat.ts";
import Api from '@/services/api.ts';
import Cookies from "js-cookie";
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

const token = Cookies.get("token");
const props = defineProps({
  products: Array<{
    id: number;
    title: string;
    image: string;
    sell_price: number;
    description: string;
    barcode:string;
  }>,
  fetchCarts:Function,
});
const addToCart = (product) => {
  if(token){
    Api.defaults.headers.common["Authorization"] = token;
    Api.post(`/api/carts`,{
      product_id: product.id,
      qty:1,
    })
        .then((response) => {
          toast(`${response.data.meta.message}`,{
            type: 'success',
            dangerouslyHTMLString:true
          });
          props.fetchCarts();
        });
  }
};

</script>

<template>

  <div v-if="products.length > 0">
    <div class="container px-4 mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <div v-for="product in products" :key="product.id" class="flex">
          <Card class="flex flex-col w-full h-full p-4 shadow hover:shadow-lg transition rounded-xl border border-gray-200">
            <CardHeader class="text-center">
              <CardTitle class="text-lg font-bold truncate">{{ product.title }}</CardTitle>
              <CardDescription class="text-xs text-gray-500">Kode: {{ product.barcode }}</CardDescription>
            </CardHeader>

            <CardContent class="flex flex-col items-center justify-between gap-3 flex-grow">
              <div class="bg-green-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
                {{ moneyFormat(product.sell_price) }}
              </div>

              <img
                  :src="getImageUrl(product.image)"
                  :alt="product.title"
                  class="w-full h-24 object-cover rounded"
              />

              <button
                  class="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg"
                  @click="addToCart(product)"
              >
                Tambahkan Ke Keranjang
              </button>
            </CardContent>

            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
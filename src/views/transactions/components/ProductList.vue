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
  <div class="flex flex-wrap gap-4">
    <div v-for="product in products" :key="product.id" class="col-4">
      <Card class=" w-[250px] h-auto gap-2 items-center">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent class="w-full flex flex-col justify-between gap-4 items-center">
          <div class=" bg-green-600 p-2 rounded-lg">
            <h4 class=" mb-0 text-sm text-white">{{ moneyFormat(product.sell_price) }}</h4>
          </div>
          <img :src="`${getImageUrl(product.image)}`" :alt="product.title" class="rounded w-full h-[100px] object-cover" />
          <div class="w-full flex font-bold text-xs justify-center items-center text-2xl">{{product.title}}</div>
          <button class="w-full p-2 bg-blue-500 text-white rounded-2xl text-sm cursor-pointer" @click="addToCart(product)"> Tambahkan Ke Keranjang </button>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
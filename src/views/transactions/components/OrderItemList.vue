<script setup lang="ts">
import {defineProps} from 'vue';
import {moneyFormat} from "@/utils/moneyFormat.ts";
import {getImageUrl} from "@/utils/getImageUrl.ts";
import Cookies from 'js-cookie';
import Api from '@/services/api.ts';
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const token= Cookies.get('token');

const props = defineProps<{
  fetchCarts:Function,
  carts: Array<{
    id: number;
    qty: number;
    price: number;
    product: {
      id: number;
      product_id: number;

      image:string
      title: string;
    };
  }>,

}>();

const deleteCart = (cartID) => {
  if(token){
    Api.defaults.headers.common['Authorization'] = token;
    Api.delete(`/api/carts/${cartID}`)
        .then((response) => {
          toast(`${response.data.meta.message}`,{
            type: 'success',
            dangerouslyHTMLString:true
          });

          props.fetchCarts();
        })
  }
};
</script>

<template>
  <div v-for="cart in props.carts" :key="cart.id" class="flex flex-col  justify-center  ">
    <div class="border-2 shadow-sm m-2 p-4 rounded-lg flex">
      <img :src="`${getImageUrl(cart.product.image)}`" :alt="cart.product.title" width="50" height="50" class="me-3" />
      <div class="flex flex-col w-full">
        <h4 class="mb-0 font-bold">{{ cart.product.title }}</h4>
        <hr class="mb-1 mt-1" />
        <p class="text-green-600 text-xs mb-0">Harga: {{ moneyFormat(cart.price) }}</p>
        <p class="text-green-600 text-xs">Jumlah: {{cart.qty}}</p>

        <button class="cursor-pointer bg-red-600 rounded-md text-white text-xs p-2 w-full"  @click="deleteCart(cart.id)">
          Hapus
        </button>
      </div>
  </div>
</div>
</template>

<style scoped>

</style>
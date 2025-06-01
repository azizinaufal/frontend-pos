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
  <div class="container px-4 mx-auto">
    <div v-for="cart in props.carts" :key="cart.id" class="mb-4">
      <div class="flex flex-col sm:flex-row items-center gap-4 border-2 shadow-sm p-4 rounded-lg">
        <!-- Gambar Produk -->
        <img
            :src="getImageUrl(cart.product.image)"
            :alt="cart.product.title"
            class="w-16 h-16 object-cover rounded"
        />

        <!-- Info Produk -->
        <div class="flex flex-col flex-grow text-sm w-full">
          <h4 class="font-bold text-base truncate">{{ cart.product.title }}</h4>
          <hr class="my-1" />
          <p class="text-green-600">Harga: {{ moneyFormat(cart.price) }}</p>
          <p class="text-green-600">Jumlah: {{ cart.qty }}</p>

          <!-- Tombol Hapus -->
          <button
              class="mt-2 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-2 rounded-md w-full sm:w-auto"
              @click="deleteCart(cart.id)"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
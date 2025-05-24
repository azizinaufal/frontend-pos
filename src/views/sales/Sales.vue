<script setup lang="ts">
import {ref} from 'vue';
import Api from "@/services/api.ts";
import Cookies from "js-cookie";
import {moneyFormat} from "@/utils/moneyFormat.ts";
import {Funnel} from 'lucide-vue-next';
import ExportButton from '@/views/components/ExportButton.vue';

const startDate  =ref('');
const endDate  =ref('');
const sales = ref([]);
const total = ref(0);

const token =  Cookies.get("token");

const filterSales = async (e) => {
  e.preventDefault();
  if (token) {
    Api.defaults.headers.Authorization = token;
    try {
      const response = await Api.get(`/api/sales?start_date=${startDate.value}&end_date=${endDate.value}`);
      sales.value = response.data.data.sales;
      total.value = response.data.data.total;
    }catch (error) {
      console.log("eror mengambil data", error);
    }
  }else{
    console.log("Token tidak valid");
  }
};
</script>

<template>
<div class="flex flex-col m-6">
  <div class="flex flex-col">
    <p class="font-sans text-gray-600 text-s">HALAMAN</p>
    <h2 class="font-bold text-2xl">PENJUALAN</h2>
  </div>
  <form @submit="filterSales">
    <div class="flex my-4 bg-white border shadow-sm rounded-sm p-4 gap-4  items-center ">
      <div class="flex flex-col gap-2 my-2 w-full">
        <label class="font-bold">TANGGAL AWAL</label>
        <input v-model="startDate" type="date" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5">
      </div>
      <div class="flex flex-col gap-2 my-2 w-full">
        <label class="font-bold">TANGGAL AKHIR</label>
        <input v-model="endDate" type="date"  class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5">
      </div>
      <div class="mt-6 gap-4 flex flex-col">
        <button class="text-white px-8 items-center ml-2 bg-blue-600 rounded-lg h-8 hover:bg-sky-700 flex">
          <Funnel></Funnel>
            Filter
        </button>
        <ExportButton :startDate="startDate" :endDate="endDate" type="sales" />
      </div>

    </div>
  </form>
  <div v-if="sales.length>0">
      <table class="w-full table-spacing-4 border border-gray-400 border-collapse text-center">
        <thead>
        <tr class="bg-gray-200">
          <th class="p-2 border border-gray-300">Date</th>
          <th class="p-2 border border-gray-300">Invoice</th>
          <th class="p-2 border border-gray-300">Cashier</th>
          <th class="p-2 border border-gray-300">Customer</th>
          <th class="p-2 border border-gray-300">Total</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(sale,index) in sales" :key="index">
          <td class="p-2 border border-gray-300">{{sale.created_at}}</td>
          <td class="p-2 border border-gray-300">{{sale.invoice}}</td>
          <td class="p-2 border border-gray-300">{{sale.cashier.name}}</td>
          <td class="p-2 border border-gray-300">{{sale.customer?.name ??'Umum'}}</td>
          <td class="p-2 border border-gray-300 text-right">{{moneyFormat(sale.grand_total)}}</td>
        </tr>
        <tr>
          <td colspan="4" class="text-center font-bold p-2 border border-gray-300">Total</td>
          <td class="text-end font-bold p-2 border border-gray-300">{{moneyFormat(total)}}</td>
        </tr>
        </tbody>
      </table>
  </div>
</div>
</template>

<style scoped>

</style>
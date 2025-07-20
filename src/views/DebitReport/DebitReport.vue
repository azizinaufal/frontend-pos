<script setup lang="ts">
import {ref} from 'vue';
import Api from "@/services/api.ts";
import Cookies from "js-cookie";
import {moneyFormat} from "@/utils/moneyFormat.ts";
import {Funnel} from 'lucide-vue-next';
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'
// import {Table} from "@/components/ui/table";
// import ExportButton from '@/views/components/ExportButton.vue';


const startDate  =ref('');
const endDate  =ref('');
const debits = ref([]);
// const total = ref(0);
const grandTotalAll = ref(0);

const token =  Cookies.get("token");



const findDebit = async (e) => {
  e.preventDefault();

  if (token) {
    Api.defaults.headers.Authorization = token;
    try {
      const response = await Api.get(`/api/debits?start_date=${startDate.value}&end_date=${endDate.value}`);
      if (!startDate.value || !endDate.value) {

        // toast.warning("Tanggal awal dan tanggal akhir harus diisi.");

      }
      debits.value = response.data.data;
      // total.value = response.data.data.grand_total;
      grandTotalAll.value = debits.value.reduce((sum, debit) => sum + debit.grand_total, 0);
    }catch (error) {

        toast.error(error.response.data.meta.message);

      console.log("eror mengambil data", error);
    }
  }else{
    console.log("Token tidak valid");
  }
};

// const calculateSubTotal = (price,qty)=>{
//   return qty * price;
// }
</script>

<template>
<div class="flex flex-col m-6">
  <div class="flex flex-col">
    <p class="font-sans text-gray-600 text-s">HALAMAN</p>
    <h2 class="font-bold text-2xl">BELANJA PRODUK</h2>
  </div>
  <form @submit="findDebit">
    <div class="container">
      <div class="grid  grid-cols-1  gap-4 md:grid-cols-3 gap-4 lg:grid-cols-3  ">
        <div class="flex flex-col gap-2 my-2 w-full">
          <label class="font-bold">TANGGAL AWAL</label>
          <input v-model="startDate" type="date" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5">
        </div>
        <div class="flex flex-col gap-2 my-2 w-full">
          <label class="font-bold">TANGGAL AKHIR</label>
          <input v-model="endDate" type="date"  class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5">
        </div>
        <div class="  gap-4 w-1/2 flex   items-end mt-8 md:items-center">
          <button class=" text-white w-full justify-center p-2.5 items-center bg-blue-600 rounded-md h-8 hover:bg-sky-700 flex">
            <Funnel class="mr-2"></Funnel>
            Filter
          </button>
<!--          <ExportButton :startDate="startDate" :endDate="endDate" type="sales" />-->
        </div>

      </div>
    </div>

  </form>
  <div v-if="debits.length > 0" class="overflow-x-auto scrollbar-visible rounded-md border border-gray-400 mt-8">
    <table class="w-full border-collapse text-center min-w-[600px]">
      <thead>
      <tr class="bg-gray-200">
        <th class="p-2 border border-gray-300">Date</th>
        <th class="p-2 border border-gray-300">Invoice</th>
        <th class="p-2 border border-gray-300">Supplier</th>
        <th class="p-2 border border-gray-300">Detail Belanja</th>
        <th class="p-2 border border-gray-300">Total Pembelian</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(debit, index) in debits" :key="index">
        <td class="p-2 border border-gray-300">{{ debit.created_at }}</td>
        <td class="p-2 border border-gray-300">{{ debit.invoice }}</td>
        <td class="p-2 border border-gray-300">{{ debit.supplier.name }}</td>

        <td class="p-0 border border-gray-300">
            <table class="w-full">
              <thead>
              <tr class="bg-gray-300">
                <th class="p-2 font-semibold text-sm">Nama Produk</th>
                <th class="p-2 font-semibold text-sm">Harga Satuan</th>
                <th class="p-2 font-semibold text-sm">Jumlah</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="detail in debit.debit_details" :key="detail.id">
                <td class="p-2">{{ detail.product.title }}</td>
                <td class="p-2 text-right">{{ moneyFormat(detail.price) }}</td>
                <td class="p-2 text-center">{{ detail.qty }}</td>

              </tr>
              </tbody>
            </table>
        </td>
        <td class="p-2 border border-gray-300">{{ moneyFormat(debit.grand_total) }}</td>
      </tr>
      <tr >
        <td colspan="4" class="text-center font-bold p-2 border border-gray-300">Total</td>
        <td class="text-end font-bold p-2 border border-gray-300">{{ moneyFormat(grandTotalAll) }}</td>
      </tr>
      </tbody>
    </table>
  </div>

</div>
</template>

<style scoped>

</style>
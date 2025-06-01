<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { moneyFormat } from "@/utils/moneyFormat.ts";
import Api from "@/services/api.ts";
import Cookies from "js-cookie";

interface Product {
  title: string;
}

interface TransactionDetail {
  product: Product;
  qty: number;
  price: number;
}

interface Cashier {
  name?: string;
}

interface Customer {
  name?: string;
}

interface Transaction {
  created_at?: string;
  invoice?: string;
  cashier?: Cashier;
  customer?: Customer;
  discount?: number;
  cash?: number;
  change?: number;
  transaction_details?: TransactionDetail[];
}

const queryParams = new URLSearchParams(window.location.search);
const invoice = queryParams.get("invoice") || "";

const transaction = ref<Transaction>({});
const transactionDetails = ref<TransactionDetail[]>([]);

const token = Cookies.get("token");

const fetchTransactions = async () => {
  if (token) {
    Api.defaults.headers.common["Authorization"] = token;
    try {
      const response = await Api.get(`/api/transactions?invoice=${invoice}`);

      transaction.value = response.data.data ?? {};
      transactionDetails.value = response.data.data?.transaction_details ?? [];
    } catch (error) {
      console.error("Gagal fetch transaksi:", error);
    }
  }
};

onMounted(() => {
  fetchTransactions();
});
</script>

<template>
<div class="w-[80mm] p-10 text-xl">
  <div class="text-center pb-8">
    <div class="text-center text-base uppercase">
      Kasir.In
    </div>
    <div class="text-center">
      Alamat: Pasir Wetan RT01 RW 02, Kec. Karanglewas, Kab. Banyumas,
    </div>
    <div class="text-center">
      Telp: 0821392766710
    </div>
  </div>

  <div class="h-[1px] border-t-1 border-black border-dashed"></div>

  <table class="w-full text-xs border-spacing-0">
  <tbody>
  <tr>
    <td>TANGGAL</td>
    <td>:</td>
    <td>{{ transaction.created_at }}</td>
  </tr>
  <tr>
    <td>FAKTUR</td>
    <td>:</td>
    <td>{{ transaction.invoice }}</td>
  </tr>
  <tr>
    <td>KASIR</td>
    <td>:</td>
    <td>{{ transaction.cashier?.name ?? '' }}</td>
  </tr>
  <tr>
    <td>PEMBELI</td>
    <td>:</td>
    <td>{{ transaction.customer?.name ?? 'Umum' }}</td>
  </tr>
  </tbody>
  </table>

  <div class="">
    <table class="w-full text-xs border-spacing-0">
      <tbody>
      <tr>
        <td class="py-2">
          <div class=" border-t-1 border-dashed border-black"></div>
        </td>
      </tr>
      <tr>
        <td class="text-left">PRODUK</td>
        <td class="text-center">QTY</td>
        <td class="text-right">HARGA</td>
      </tr>
      <tr>
        <td class="py-2">
          <div class=" border-t-1 border-dashed border-black"></div>
        </td>
      </tr>
      <tr v-for="(item,index) in transactionDetails" :key="index">
        <td >{{item.product.title}}</td>
        <td class="text-center">{{item.qty}}</td>
        <td class="text-right" >{{moneyFormat(item.price)}}</td>
      </tr>
      <tr>
        <td class="py-2">
          <div class=" border-t-1 border-dashed border-black"></div>
        </td>
      </tr>
      <tr>
        <td class="text-right col-span-3">DISKON</td>
        <td class="text-right col-span-3">:</td>
        <td class="text-right ">{{moneyFormat(transaction.discount)}}</td>
      </tr>
      <tr>
        <td class="py-2">
          <div class=" border-t-1 border-dashed border-black"></div>
        </td>
      </tr>
      <tr>
        <td class="text-right col-span-3">TUNAI</td>
        <td class="text-right col-span-3">:</td>
        <td class="text-right ">{{moneyFormat(transaction.cash)}}</td>
      </tr>

      <tr>
        <td class="text-right col-span-3">KEMBALI</td>
        <td class="text-right col-span-3">:</td>
        <td class="text-right ">{{moneyFormat(transaction.change)}}</td>
      </tr>

      </tbody>
    </table>
  </div>

  <div class="mt-25 text-center"> ===========</div>
  <div class="mt-5 text-center text-xs">
    TERIMAKASIH <br>
    ATAS KUNJUNGAN ANDA
  </div>
</div>
</template>

<style scoped>
html{
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
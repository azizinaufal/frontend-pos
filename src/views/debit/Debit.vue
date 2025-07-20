<script setup lang="ts">
import {onMounted,ref} from "vue";
import Api from '@/services/api.ts';
import Cookies from 'js-cookie';
import CreateDebit from "@/views/debit/Create.vue";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {VueAwesomePaginate} from "vue-awesome-paginate";
import {Input} from "@/components/ui/input";
import {moneyFormat} from "@/utils/moneyFormat.ts";
// import DeleteButton from "@/views/components/Delete.vue";

const debits = ref([]);
const pagination = ref({
  currentPage: 1,
  perPage: 5,
  total:0
});
const keywords = ref("");

const fetchData = async (pageNumber=1, search="") => {
  const token = Cookies.get("token");
  if(token){
    Api.defaults.headers.Authorization = token;
    try {
      const response = await Api.get(`/api/debits-all?page=${pageNumber}&search=${search}`);
      debits.value = response.data.data;
      pagination.value = {
        currentPage: response.data.pagination.currentPage,
        perPage: response.data.pagination.perPage,
        total: response.data.data.total,
      };
    }catch(error){
      console.log("Kesahalan saat fetch debit")
    }
  }else{
    console.log("Token tidak valid")
  }
}

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
      <h2 class="font-bold text-2xl">DEBIT PRODUK</h2>
    </div>
    <div class="my-8 flex items-center ">
      <CreateDebit :fetchData="fetchData"/>
      <Input id="search" type="text" placeholder="Cari Nama Supplier" class="pl- 10" v-model="keywords" @keydown="handleKeyDown" />
      <Button class="ml-2 bg-blue-600 rounded-md h-8 hover:bg-sky-700" @click="searchHandler">Cari</Button>
    </div>
    <div class="rounded-md border overflow-x-auto scrollbar-visible">
      <Table class="items-center">
        <TableHeader>
          <TableRow>
            <TableHead class="text-center">Invoice</TableHead>
            <TableHead class="text-center">Nama Supplier</TableHead>
            <TableHead class="text-center">Produk</TableHead>
            <TableHead class="text-center">Jumlah</TableHead>
            <TableHead class="text-center">Harga Beli</TableHead>
<!--            <TableHead>Aksi</TableHead>-->
          </TableRow>
        </TableHeader>
        <TableBody>
          <tr v-for="(debit, index) in debits" :key="index">
            <td class="p-2 border border-gray-300 text-center">
               {{ debit.invoice }}
            </td>
            <td class="p-2 border border-gray-300 text-center">
              {{ debit.supplier.name }}
            </td>
            <td class="p-0 border border-gray-300 align-top text-center">
              <div v-for="(detail, i) in debit.debit_details" :key="i"
                   class="p-2 text-center">
                {{ detail.product.title }}
              </div>
            </td>
            <td class="p-0 border border-gray-300 align-top">
              <div v-for="(detail, i) in debit.debit_details" :key="i"
                   class="p-2 text-center">
                {{ detail.qty }}
              </div>
            </td>
            <td >
                <div class="text-center" v-for="(detail, i) in debit.debit_details" :key="i">
                  {{ moneyFormat(detail.price) }}
                </div>
            </td>
<!--            <TableCell>-->
<!--              <div class="flex space-x-2">-->
<!--                <EditCustomer :fetchData="fetchData" :customerId="customer.id" />-->
<!--                <DeleteButton :fetchData="fetchData" :id="customer.id" endpoint="/api/customers" />-->
<!--              </div>-->
<!--            </TableCell>-->
          </tr>
          <tr v-if="!debits.length">
            <td colspan="4" class="text-center">
              <div class="bg-red-100 text-red-600 p-4 rounded-md">
                Data Belum Tersedia!
              </div>
            </td>
          </tr>
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
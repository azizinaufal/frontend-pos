<script setup lang="ts">
import {ref,onMounted} from "vue";
import Api from '@/services/api.ts';
import Cookies from 'js-cookie';
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {VueAwesomePaginate} from "vue-awesome-paginate";
import {Button} from "@/components/ui/button";
import CreateCustomer from './Create.vue';
import EditCustomer from './Edit.vue';
import DeleteButton from '@/views/components/Delete.vue';
const customers = ref([]);
const pagination = ref({
  currentPage: 1,
  perPage: 5,
  total:0
});

const keywords = ref("");

const fetchData = async (pageNumber = 1, search="") => {
  const token = Cookies.get("token");
  if(token){
    Api.defaults.headers.Authorization = token;
    try {
      const response = await Api.get(`/api/customers?page=${pageNumber}&search=${search}`);
      customers.value = response.data.data;
      pagination.value={
        currentPage:response.data.pagination.currentPage,
        perPage:response.data.pagination.perPage,
        total:response.data.pagination.total
      };
    }catch(error){
      console.log("Kesalahan fetch data customers")
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

const handleKeyDown = (e) =>{
  if(e.key==="Enter"){
      searchHandler();
  }
};
</script>

<template>
  <div class="flex flex-col justify-between m-6">
    <div class="flex flex-col">
      <p class="font-sans text-gray-600 text-s">HALAMAN</p>
      <h2 class="font-bold text-2xl">PELANGGAN</h2>
    </div>
    <div class="my-8 flex items-center ">
      <CreateCustomer :fetchData="fetchData"/>
      <Input id="search" type="text" placeholder="Cari Pelangaan" class="pl- 10" v-model="keywords" @keydown="handleKeyDown" />
      <Button class="ml-2 bg-blue-600 rounded-md h-8 hover:bg-sky-700" @click="searchHandler">Cari</Button>
    </div>
    <div class="rounded-md border overflow-x-auto scrollbar-visible">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Customer</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead>No. Telp</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(customer, index) in customers" :key="index">
            <TableCell>
              <p class="text-gray-600">{{ customer.name }}</p>
            </TableCell>
            <TableCell>
              <p class="text-gray-600">{{ customer.address }}</p>
            </TableCell>
            <TableCell>
              <p class="text-gray-600">{{ customer.no_telp }}</p>
            </TableCell>
            <TableCell>
              <div class="flex space-x-2">
                <EditCustomer :fetchData="fetchData" :customerId="customer.id" />
                <DeleteButton :fetchData="fetchData" :id="customer.id" endpoint="/api/customers" />
              </div>
            </TableCell>
          </TableRow>
          <TableRow v-if="!customers.length">
            <TableCell colspan="4" class="text-center">
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
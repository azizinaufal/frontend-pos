<script setup lang="ts">
import {ref,onMounted} from 'vue';
import Cookies from 'js-cookie';
import Api from '@/services/api.ts';
import 'vue3-toastify/dist/index.css';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import EditProfil from './Edit.vue';

const users = ref([]);


const fetchData = async () => {
  const token = Cookies.get('token');
  if(token){
    Api.defaults.headers.Authorization = token;
    try {
      const response = await Api.get('/api/users');
      users.value = response.data.data;

    }catch(error){
      console.log("Eror ketika fetch data", error)
    }
  }else{
    console.log("Token tidak valid")
  }
};
onMounted(() => {
  fetchData();
});


</script>

<template>
<!--  <div class="flex flex-col m-6">
    <p class="font-sans text-gray-600 text-s">HALAMAN</p>
    <h2 class="font-bold text-2xl">PROFIL</h2>
  </div>
  <div class="flex flex-col m-12 justify-center items-center">

    <form @submit.prevent="updateUser">
      <div class="flex flex-col gap-4">
        <div class="flex gap-8 justify-between items-center">
          <label for="name" class="text-right">
            Nama
          </label>
          <input id="name" type="text" placeholder="Masukan Nama Baru" v-model="name" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-[400px] p-2.5" />
        </div>
        <div class="flex gap-8 justify-between items-center">
          <label for="email" class="text-right">
            Email
          </label>
          <input id="email" type="email" placeholder="Masukan Email Baru" v-model="email" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-[400px] p-2.5" />
        </div>
        <div class="flex gap-8 justify-between items-center">
          <label for="password" class="text-right">
            Password
          </label>
          <input id="password" type="password" placeholder="Masukan Password Baru" v-model="password" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-[400px] p-2.5" />
        </div>
      </div>
    </form>

  </div>-->
  <div class="flex flex-col justify-between m-6">
    <div class="flex flex-col">
      <p class="font-sans text-gray-600 text-s">HALAMAN</p>
      <h2 class="font-bold text-2xl">PROFIL</h2>
    </div>
    <div class="rounded-md border my-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(user, index) in users" :key="index">
            <TableCell>
              <p class="text-gray-600">{{ user.name }}</p>
            </TableCell>
            <TableCell>
              <p class="text-gray-600">{{user.email}}</p>
            </TableCell>
            <TableCell>
              <div class="flex space-x-2">
              <EditProfil :fetchData="fetchData" :userId="user.id" />
              </div>
            </TableCell>
          </TableRow>
          <TableRow v-if="!users.length">
            <TableCell colspan="3" class="text-center">
              <div class="bg-red-100 text-red-600 p-4 rounded-md">
                Data Belum Tersedia!
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<style scoped>

</style>
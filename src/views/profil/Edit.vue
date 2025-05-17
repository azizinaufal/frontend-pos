<script setup lang="ts">
import {ref,onMounted,defineProps} from 'vue';
import Cookies from 'js-cookie';
import Api from '@/services/api.ts';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {handleErrors} from "@/utils/handleErrors.ts";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle, DialogTrigger
} from "@/components/ui/dialog";

const props = defineProps({
  fetchData:Function,
  userId:Number
});

const name = ref('');
const email = ref('');
const password = ref();
const errors = ref <Record<string, string>>({});
const token = Cookies.get('token');

const fetchUser = async () => {
  if(props.userId){
    try {
      Api.defaults.headers.Authorization = token;
      const response = await Api.get(`/api/users/${props.userId}`);
      const customer = response.data.data;
      name.value = customer.name;
      email.value = customer.email;
    }catch(error){
      console.log("Eror ketika fetch data", error);
    }
  }
};

onMounted(() => {
  fetchUser();
});

const updateUser = async () => {
  Api.defaults.headers.Authorization = token;
  await Api.put(`/api/users/${props.userId}`,{
    name:name.value,
    email:email.value,
    password:password.value,
  })
      .then((response) => {
        toast(`${response.data.meta.message}`,{
          type: 'success',
          dangerouslyHTMLString:true
        });
        props.fetchData();
      })
      .catch((error) => {
        handleErrors(error.response.data, errors);
      });
};
</script>

<template>
  <Dialog >
    <DialogTrigger  class="cursor-pointer bg-blue-600 rounded-md h-8 text-white mr-2 px-2 hover:bg-sky-700">
      Edit
    </DialogTrigger>
    <DialogContent >
      <form @submit.prevent="updateUser">
        <DialogHeader>
          <DialogTitle>Edit Profil</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div class="flex flex-col gap-3 my-4">
          <div class="flex gap-2 items-center w-full">
            <div class="flex flex-col gap-2 items-start w-full">
              <label for="name" class="text-right">
                Nama
              </label>
              <input id="name" placeholder="Masukan Nama Baru" v-model="name" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5" />
              <div v-if="errors.name" class="mt-2 text-sm text-red-600">
                {{ errors.name }}
              </div>
            </div>
          </div>
          <div class="flex gap-2 items-center w-full">
            <div class="flex flex-col gap-2 items-start w-full">
              <label for="email" class="text-right">
                Email
              </label>
              <input id="email" type="email" placeholder="Masukan Email Baru" v-model="email" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5" />
              <div v-if="errors.email" class="mt-2 text-sm text-red-600">
                {{ errors.email }}
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="flex flex-col gap-2 items-start w-full">
              <label for="password" class="text-right">
                Password
              </label>
              <input id="password" type="password" placeholder="Masukan Password Baru (Kosongkan jika tidak diperbarui)" v-model="password" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5" />
              <div v-if="errors.password" class="mt-2 text-sm text-red-600">
                {{ errors.password }}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <a href="#" class="bg-white rounded-md p-2 border-2 hover:bg-gray-200">Batal</a>
          </DialogClose>
          <button type="submit" class="bg-blue-500 rounded-md p-2 text-white cursor-pointer hover:bg-sky-500">Simpan</button>
        </DialogFooter>
      </form>
    </DialogContent>

  </Dialog>
</template>

<style scoped>

</style>
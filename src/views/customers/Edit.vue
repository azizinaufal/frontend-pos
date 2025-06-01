<script setup lang="ts">
import {ref,onMounted, defineProps} from 'vue';
import Api from '@/services/api.ts';
import Cookies from 'js-cookie';
import {handleErrors} from "@/utils/handleErrors.ts";
import {toast} from 'vue3-toastify';
import "vue3-toastify/dist/index.css";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle, DialogTrigger
} from "@/components/ui/dialog";

const props = defineProps({
  customerId:Number,
  fetchData:Function
});

const name =ref('');
const address = ref('');
const noTelp =ref('');
const errors = ref <Record<string, string>>({});

const token = Cookies.get('token');

const fetchCustomer = async () => {
  if(props.customerId){
    try {
      Api.defaults.headers.common['Authorization'] = token;
      const response = await Api.get(`/api/customers/${props.customerId}`);
      const customer = response.data.data;
      name.value = customer.name
      address.value = customer.address
      noTelp.value = customer.no_telp
    }catch(error){
      console.log("Gagal fetch data customer", error)
    }
  }
};

onMounted(() => {
  fetchCustomer();
});

const updateCustomer = async () => {
  Api.defaults.headers.common['Authorization'] = token;
  await Api.put(`/api/customers/${props.customerId}`, {
    name: name.value,
    address: address.value,
    no_telp: noTelp.value,
  })
      .then((response) => {
        toast(`${response.data.meta.message}`,{
          type: 'success',
          dangerouslyHTMLString:true
        });
        props.fetchData();
      })
      .catch((error) => {
          handleErrors(error.response.data,errors);
      });
}
</script>

<template>
  <Dialog >
    <DialogTrigger  class="cursor-pointer bg-blue-600 rounded-md h-8 text-white mr-2 px-2 hover:bg-sky-700">
      Edit
    </DialogTrigger>
    <DialogContent >
      <form @submit.prevent="updateCustomer">
        <DialogHeader>
          <DialogTitle>Edit Pelanggan</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div class="flex flex-col gap-3 my-4">

          <div class="flex flex-col items-start gap-2 w-full">
            <label for="barcode" class="text-right">
              Nama Pelanggan
            </label>
            <input id="name" placeholder="Masukan Nama Pelanggan" v-model="name" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5" />
            <div v-if="errors.name" class="mt-2 text-sm text-red-600">
              {{ errors.name }}
            </div>
          </div>

          <div class="flex gap-2 items-center w-full">
            <div class="flex flex-col items-start gap-2 w-full">
              <label for="no_telp" class="text-right">
                No. Telp
              </label>
              <input id="no_telp" placeholder="Masukan No. Telp" v-model="noTelp" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5" />
              <div v-if="errors.no_telp" class="mt-2 text-sm text-red-600">
                {{ errors.no_telp }}
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-2 items-start w-full">
            <label for="address" class="text-right">
              Alamat Pelanggan
            </label>
            <textarea id="address" placeholder="Masukan Nama Produk" v-model="address" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5" />
            <div v-if="errors.address" class="mt-2 text-sm text-red-600">
              {{ errors.address }}
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
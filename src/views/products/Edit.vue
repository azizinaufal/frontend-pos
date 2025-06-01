<script setup lang="ts">
import {defineProps, ref, onMounted} from 'vue';
import Api from '@/services/api.ts';
import Cookies from 'js-cookie';
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {handleErrors} from "@/utils/handleErrors.ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,DialogClose,
  DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
const props = defineProps({
  fetchData:Function,
  productId:Number,
});

const barcode =ref('');
const title = ref('');
const image = ref('');
const description = ref('');
const stock = ref('');
const sellPrice = ref('');
const buyPrice = ref('');
const categoryId = ref('');
const errors = ref<Record<string, any>>({});

const categories = ref([]);

const fileInputRef = ref(null);
const modalRef = ref(null);

const token = Cookies.get('token');

const fetchCategories = async () => {
  try {
    Api.defaults.headers.common['Authorization'] = token;
    const response = await Api.get('/api/categories-all');
    categories.value = response.data.data;
  }catch (error) {
    console.error("Kesalahan saat fetch data kategori", error);
  }
};

const fetchProducById = async () => {
  if(props.productId){
    try {
      Api.defaults.headers.common['Authorization'] = token;
      const response =  await Api.get(`/api/products/${props.productId}`);
      const data = response.data.data;
      barcode.value = data.barcode;
      title.value = data.title;
      description.value = data.description;
      sellPrice.value = data.sell_price;
      buyPrice.value = data.buy_price;
      stock.value = data.stock;
      categoryId.value = data.category_id;
    }catch (error) {
      console.error("Kesalahan saat fetch data produk", error);
    }
  }
};

onMounted(()=>{
  fetchCategories();
  fetchProducById();
});

const handleFileChange = (e)=>{
  const imageData = e.target.files[0];

  if(!imageData.type.match('image.*')) {
    fileInputRef.value = "";
    image.value = "";
    toast("Format gambar tidak didukung", {
      type: "error",
      dangerouslyHTMLString:true,
    });

    return;
  }
  image.value = imageData;
};

const updateProduct = async () => {
  const formData = new FormData();

  formData.append('barcode', barcode.value);
  formData.append('title', title.value);
  formData.append('description', description.value);
  formData.append('image', image.value);
  formData.append('buy_price', buyPrice.value);
  formData.append('sell_price', sellPrice.value);
  formData.append('stock', stock.value);
  formData.append('category_id', categoryId.value);

  Api.defaults.headers.common['Authorization'] = token;
  await Api.put(`/api/products/${props.productId}`, formData)
      .then((response)=>{
        toast(`${response.data.meta.message}`,{
          type: 'success',
          dangerouslyHTMLString:true,
        });
        props.fetchData();
        modalRef.value=false;
      })
      .catch((error)=>{
        handleErrors(error.response.data, errors);
      })
};
</script>

<template>
  <Dialog >
    <DialogTrigger  class="cursor-pointer bg-blue-600 rounded-md h-8 text-white mr-2 px-2 hover:bg-sky-700">
      Edit
    </DialogTrigger>
    <DialogContent >
      <form @submit.prevent="updateProduct">
        <DialogHeader>
          <DialogTitle>Edit Produk</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div class="flex flex-col gap-3 my-4">
          <div class="flex flex-col gap-2">
            <label class="block text-sm font-medium text-gray-700 my-2">Gambar</label>
            <input type="file" @change="handleFileChange" ref="fileInputRef" class="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0 file:text-sm file:font-semibold
                  file:bg-blue-600 file:text-white hover:file:bg-sky-400
                   border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <div v-if="errors.images" class="mt-2 text-sm text-red-600">
              {{ errors.image }}
            </div>
          </div>
          <div class="flex gap-2 items-center w-full">
            <div class="flex flex-col items-start gap-2 w-full">
              <label for="barcode" class="text-right">
                Barcode
              </label>
              <input id="barcode" placeholder="Masukan Barcode Produk" v-model="barcode" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5" />
              <div v-if="errors.barcode" class="mt-2 text-sm text-red-600">
                {{ errors.barcode }}
              </div>
            </div>
            <div class="flex flex-col gap-2 items-start w-full">
              <label for="title" class="text-right">
                Nama Produk
              </label>
              <input id="title" placeholder="Masukan Nama Produk" v-model="title" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5" />
              <div v-if="errors.title" class="mt-2 text-sm text-red-600">
                {{ errors.title }}
              </div>
            </div>
          </div>
          <div class="flex gap-2 items-center w-full">
            <div class="flex flex-col items-start gap-2 w-full">
              <label for="category" class="text-right">
                Category
              </label>
              <select id="category"  class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5" v-model="categoryId">
                <option value=""> Pilih Kategori </option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
              <div v-if="errors.category" class="mt-2 text-sm text-red-600">
                {{ errors.category }}
              </div>
            </div>
            <div class="flex flex-col gap-2 items-start w-full">
              <label for="stock" class="text-right">
                Stok
              </label>
              <input id="stock" placeholder="Masukan Stock" v-model="stock" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5" />
              <div v-if="errors.stock" class="mt-2 text-sm text-red-600">
                {{ errors.stock }}
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="flex flex-col gap-2 items-start w-full">
              <label for="description" class="text-right">
                Deskripsi
              </label>
              <textarea id="description" placeholder="Deskripsi Produk" v-model="description" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5" />
              <div v-if="errors.description" class="mt-2 text-sm text-red-600">
                {{ errors.description }}
              </div>
            </div>
          </div>
          <div class="flex gap-2 items-center w-full">
            <div class="flex flex-col items-start gap-2 w-full">
              <label for="buy_price" class="text-right">
                Harga Beli
              </label>
              <input id="buy_price" placeholder="Masukan Harga Beli" v-model="buyPrice" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5" />
              <div v-if="errors.buy_price" class="mt-2 text-sm text-red-600">
                {{ errors.buy_price }}
              </div>
            </div>
            <div class="flex flex-col gap-2 items-start w-full">
              <label for="sell_price" class="text-right">
                Harga Jual
              </label>
              <input id="sell_price" placeholder="Masukan Harga Jual" v-model="sellPrice" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5" />
              <div v-if="errors.sell_price" class="mt-2 text-sm text-red-600">
                {{ errors.sell_price }}
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
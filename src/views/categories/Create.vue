<script setup lang="ts">
import {defineProps} from 'vue';
import {ref} from 'vue';
import Api from '@/services/api.ts';
import Cookies from 'js-cookie';
import {toast} from 'vue3-toastify';
import "vue3-toastify/dist/index.css";
import {handleErrors} from '@/utils/handleErrors.ts';
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const name = ref("");
const image = ref("");
const description = ref("");
const errors = ref<Record<string, string>>({});
const fileInputRef = ref(null);
const modalRef = ref(false);
const token = Cookies.get("token");

const handleFileChange = (e)=>{
  const imageData = e.target.files[0];

  if(!imageData.type.match("image.*")){
    fileInputRef.value.value = "";
    image.value = "";
    toast("Format File tidak didukung",{
      type: "error",
      dangerouslyHTMLString:true
    });
    return;
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  if (imageData.size > MAX_FILE_SIZE) {
    fileInputRef.value.value = "";
    image.value = "";
    toast("Ukuran file terlalu besar. Maksimum 5MB.", {
      type: "error",
      dangerouslyHTMLString: true
    });
    return;
  }
  image.value = imageData;
};

const storeCategory = async () => {
  const formData = new FormData();
  formData.append("image", image.value);
  formData.append("name", name.value);
  formData.append("description", description.value);

  Api.defaults.headers.common["Authorization"] = token;

  await Api.post('/api/categories', formData)
      .then((response)=>{
    toast(`${response.data.meta.message}`,{
      type: "success",
      dangerouslyHTMLString:true
    });
    props.fetchData();
    name.value = "";
    image.value = "";
    description.value = "";
    modalRef.value = false;
  })
      .catch((error) => {
        handleErrors(error.response?.data, errors);
      });
};
const props = defineProps({
  fetchData: Function,
});

</script>

<template>
<Dialog >
  <DialogTrigger  class="cursor-pointer bg-blue-600 rounded-md h-8 text-white mr-2 px-2 hover:bg-sky-700">
    Tambah
  </DialogTrigger>
  <DialogContent>
    <form @submit.prevent="storeCategory">
    <DialogHeader>
      <DialogTitle>Tambah Kategori</DialogTitle>
      <DialogDescription></DialogDescription>
      <div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 my-2">Gambar</label>
            <input type="file" @change="handleFileChange" ref="fileInputRef" class="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4
           file:rounded-md file:border-0 file:text-sm file:font-semibold
           file:bg-blue-600 file:text-white hover:file:bg-sky-400
           border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div v-if="errors.image" class="mt-2 text-sm text-red-600">
              {{ errors.image }}
            </div>

            <div class="my-4">
              <label for="name" class="text-right">
                Name
              </label>
              <input id="name" v-model="name" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5" />
              <div v-if="errors.name" class="mt-2 text-sm text-red-600">
                {{ errors.name }}
              </div>
            </div>
            <div class="my-4">
              <label for="description" class="text-right">
                Deskripsi
              </label>
              <textarea id="description" v-model="description" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5" />
              <div v-if="errors.description" class="mt-2 text-sm text-red-600">
                {{ errors.description }}
              </div>
            </div>

          </div>
      </div>
    </DialogHeader>
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
<script setup lang="ts">
import {defineProps} from 'vue';
import {ref} from 'vue';
const modalRef = ref(null);
import Api from '@/services/api.ts';
import {toast} from 'vue3-toastify';
import "vue3-toastify/dist/index.css";
import Cookies from 'js-cookie';
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
const token = Cookies.get('token');

const props = defineProps({
  fetchData: Function,
  id:Number,
  endpoint:String,
});

const deleteCategory = async () => {
  Api.defaults.headers.common['Authorization'] = token;

  await Api.delete(`${props.endpoint}/${props.id}`)
      .then((response) => {
        toast(`${response.data.meta.message}`,{
          type: 'success',
          dangerouslyHTMLString:true
        });
        props.fetchData();
        modalRef.value = false;
      })
};
</script>

<template>
  <Dialog >
    <DialogTrigger  class="cursor-pointer bg-red-600 rounded-md h-8 text-white mr-2 px-2 hover:bg-red-800">
      Hapus
    </DialogTrigger>
    <DialogContent>

        <DialogHeader>
          <DialogTitle>Hapus Data?</DialogTitle>
          <div class="flex flex-col justify-between items-center font-medium my-6">
            <DialogDescription>Apakah Anda yakin menghapus data ini?</DialogDescription>
            <DialogDescription>Langkah ini tidak dapat dibatalkan</DialogDescription>
          </div>
            <div class="mb-4">
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose as-child>
            <a href="#" class="bg-white rounded-md p-2 border-2 hover:bg-gray-200">Batal</a>
            <button @click="deleteCategory"  class="bg-red-500 rounded-md p-2 text-white cursor-pointer hover:bg-red-800">Hapus</button>
          </DialogClose>
        </DialogFooter>

    </DialogContent>

  </Dialog>
</template>

<style scoped>

</style>
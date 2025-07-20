<script setup lang="ts">
import {ref, defineProps, onMounted,computed} from 'vue';
import Api from '@/services/api.ts';
import Cookies from 'js-cookie';
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {handleErrors} from "@/utils/handleErrors.ts";
import {moneyFormat} from "@/utils/moneyFormat.ts";
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
});
const supplierId = ref('');
const suppliers = ref([]);
const products = ref([]);
const items = ref([{
  product_id: null,
  qty: 1,
  price: 0,
}]);
const errors = ref<Record<string, any>>({});
const modalRef = ref(null);

const fetchInitialData= async ()=>{
  if(token){
    try {
      const response = await Api.get(`/api/suppliers-all`);
      suppliers.value = response.data.data;
      const responseProducts = await Api.get(`/api/products-all`);
      products.value = responseProducts.data.data;
    }catch(error){
      console.log("Gagal fetch data suppliers dan produtcst")
    }
  }else {
    console.log("Token tidak valid")
  }

}
onMounted(()=>{
  fetchInitialData();
});

const addItem = () => {
  items.value.push({
    product_id: null,
    qty: 1,
    price: 0,
  });
};
const removeItem = (index: number) => {
  items.value.splice(index, 1);
};

const grandTotal = computed(() => {
  return items.value.reduce((total, item) => {
    return total + (Number(item.qty) * Number(item.price));
  }, 0);
});

const token = Cookies.get('token');

const storeDebit = async () => {
  Api.defaults.headers.common['Authorization'] = token;
    Api.post(`/api/debits`, {
      supplier_id: supplierId.value,
      grand_total: grandTotal.value,
      items:items.value.map(item=>({
        product_id:item.product_id,
        qty:Number(item.qty),
        price:Number(item.price),
      })),
    })
        .then((response)=>{
          toast(`${response.data.meta.message}`,{
            type: 'success',
            dangerouslyHTMLString:true
          });

          if (props.fetchData) {
            props.fetchData();
          }
          supplierId.value = null;
          items.value = [{ product_id: null, qty: 1, price: 0 }];
          modalRef.value = false;
        })
        .catch((error)=>{
          handleErrors(error.response.data, errors);
          toast.error(error.response.data.error || "Terjadi kesalahan.");
        });
};

</script>

<template>
  <Dialog >
    <DialogTrigger  class="cursor-pointer bg-blue-600 rounded-md h-8 text-white mr-2 px-2 hover:bg-sky-700">
      Tambah
    </DialogTrigger>
    <DialogContent >
      <form @submit.prevent="storeDebit">
        <DialogHeader>
          <DialogTitle>Tambah Transaksi Debit</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div class="flex flex-col gap-3 my-4">

            <div class="flex flex-col items-start gap-2 w-full">
              <label for="supplier" class="block mb-2 text-sm font-medium">Supplier</label>
              <select id="supplier" v-model="supplierId" class="bg-white shadow-sm border border-gray-300 text-sm rounded-md block w-full p-2.5">
                <option :value="null" >-- Pilih Supplier --</option>
                <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
                  {{ supplier.name }}
                </option>
              </select>
              <div v-if="errors.supplier_id" class="mt-2 text-sm text-red-600">{{ errors.supplier_id }}</div>
            </div>
          <div v-for="(item, index) in items" :key="index" class="flex items-end gap-3 p-3 border rounded-md">
            <div class="flex-grow">
              <label class="block mb-2 text-sm font-medium">Produk</label>
              <select v-model="item.product_id" class="bg-white shadow-sm border border-gray-300 text-sm rounded-md block w-full p-2.5">
                <option :value="null" disabled>-- Pilih Produk --</option>
                <option v-for="product in products" :key="product.id" :value="product.id">
                  {{ product.title }}
                </option>
              </select>
            </div>
            <div class="w-24">
              <label class="block mb-2 text-sm font-medium">Jumlah</label>
              <input type="number" v-model="item.qty" placeholder="Qty" class="bg-white shadow-sm border border-gray-300 text-sm rounded-md block w-full p-2.5" />
            </div>

            <div class="w-40">
              <label class="block mb-2 text-sm font-medium">Harga Beli</label>
              <input type="number" v-model="item.price" placeholder="Harga" class="bg-white shadow-sm border border-gray-300 text-sm rounded-md block w-full p-2.5" />
            </div>
            <button type="button" @click="removeItem(index)" class="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
              Hapus
            </button>
        </div>
          <button type="button" @click="addItem" class="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
            + Tambah Item
          </button>

          <div class="text-right mt-4">
            <h3 class="text-lg font-bold">Grand Total: {{ moneyFormat(grandTotal) }}</h3>
            <div v-if="errors.grand_total" class="mt-2 text-sm text-red-600">{{ errors.grand_total }}</div>
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
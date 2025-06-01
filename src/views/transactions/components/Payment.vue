<script setup lang="ts">
import {ref,onMounted, defineProps, watchEffect} from "vue";
import {moneyFormat} from "@/utils/moneyFormat.ts";
import Api from "@/services/api.ts";
import Cookies from "js-cookie";
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
const props = defineProps({
  totalCarts: Number,
  fetchCarts:Function,
});

const grandTotal = ref(props.totalCarts);
const discount = ref<number>(0);
const cash = ref<number>(0);
const change = ref<number>(0);
type Customer = { value: string; label: string };

const selectedCustomer = ref<Customer | null>(null);

const customers = ref([]);

const errors = ref({
  customer: '',
  discount: '',
  cash: '',
  change: '',
});

function validateForm() {
  let isValid = true;

  errors.value.customer = '';
  errors.value.discount = '';
  errors.value.cash = '';
  errors.value.change = '';


  if (grandTotal.value <= 0) {
    toast("Keranjang kosong atau total pembayaran tidak valid.", { type: "error" });
    return;
  }
  if (discount.value < 0) {
    errors.value.discount = 'Discount tidak boleh negatif';
    isValid = false;
  }

  if (!cash.value || isNaN(cash.value)) {
    errors.value.cash = 'Cash harus diisi dengan angka valid';
    isValid = false;
  } else if (cash.value < grandTotal.value) {
    errors.value.cash = 'Cash harus lebih besar atau sama dengan Grand Total';
    isValid = false;
  }

  if (change.value < 0) {
    errors.value.change = 'Cash kurang dari Total tagihan, tidak cukup untuk pembayaran';
    isValid = false;
  }

  return isValid;
}

function calculateDiscount(e){
  discount.value = parseInt((e.target as HTMLInputElement).value) || 0;
  grandTotal.value = props.totalCarts - e.target.value;
  cash.value=0;
  change.value=0;
}

function calculateGrandTotal(){
  grandTotal.value = props.totalCarts;
}

function calculateChange(e){
  cash.value = parseInt((e.target as HTMLInputElement).value) || 0;
  change.value =e.target.value-grandTotal.value;
}

const fetchCustomers = async () => {
  const token = Cookies.get("token");
  if(token){
    Api.defaults.headers.common["Authorization" ]= token;
    const response = await Api.get(`/api/customers-all`);
    customers.value = response.data.data;
  }
};

const storeTransaction = async () => {

  if (!validateForm()) {
    toast(`Mohon perbaiki data input yang tidak valid`, {type: 'error', dangerouslyHTMLString:true});
    return;
  }
  const token = Cookies.get("token");
  if(token){
    Api.defaults.headers.common["Authorization" ]= token;

    try {
      const response = await Api.post(`/api/transactions`,{

        customer_id: selectedCustomer.value ? selectedCustomer.value.value : null,
        discount: discount.value || 0,
        cash: cash.value,
        change: change.value,
        grand_total: grandTotal.value,
      });

      toast(`${response.data.meta.message}`,{
        type: 'success',
        dangerouslyHTMLString:true
      });

      props.fetchCarts();

      const receiptWindow = window.open(`/transactions/print?invoice=${response.data.data.invoice}`, '_blank');
      if(receiptWindow){
        setTimeout(()=>{
          try{
            receiptWindow.focus();
            receiptWindow.print();
            receiptWindow.onafterprint = function(){
              receiptWindow.close();
            };
          }catch(error){
            console.log("Error saat melakukan printing:", error);
          }
          cash.value=0;
          change.value=0;
        },2000);
      }else{
        console.log("Gagal membuka jendela print");
      }
    } catch (error: any) {
      const message = error.response?.data?.meta?.message || error.message || 'Terjadi kesalahan saat melakukan transaksi';
      toast(message, {type: 'error'});
    }
  }
};

watchEffect(() => {
  calculateGrandTotal();
});

onMounted(() => {
  fetchCustomers();
});

</script>
<template>
  <Dialog >
    <DialogTrigger  class="cursor-pointer bg-blue-600 rounded-md h-8 text-white mr-2 px-2 hover:bg-sky-700 w-5/8 ">
      Cetak
    </DialogTrigger>
    <DialogContent >
        <DialogHeader>
          <DialogTitle>Pembayaran</DialogTitle>
          <div class="border-b-4 border-gray-100 my-2"></div>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      <div class="bg-gray-100 shadow-sm rounded-lg border-2 p-4 flex flex-col">
        <div class="flex justify-between gap-2 my-2">
          <h4>GRAND TOTAL</h4>
          <div>{{moneyFormat(grandTotal)}}</div>
        </div>
        <div class="border-b-4 border-gray-200 my-2"></div>
        <div class="flex justify-end text-green-500">
          Change : {{ moneyFormat(change) }}
        </div>
      </div>


        <div class="flex  items-start gap-4 w-full">
          <div class="flex flex-col w-full justify-between gap-2">
            <label class="">
              Pelanggan
            </label>
            <vSelect :options="customers" v-model="selectedCustomer" class="w-full"/>
          </div>
          <div class="flex flex-col w-full justify-between gap-2">
            <label > Discount (Rp. )</label>
            <input @input="calculateDiscount" type="number" placeholder="Cash (Rp.)" v-model="discount" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5" />
          </div>
        </div>
      <div class="flex flex-col gap-2 w-full">
        <label > Cash (Rp. )</label>
        <input @input="calculateChange" type="number" placeholder="Cash (Rp.)" v-model="cash" class="bg-white shadow-sm border border-b-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-b-blue-500 block w-full p-2.5" />
      </div>


        <DialogFooter>
          <DialogClose as-child>
            <a href="#" class="bg-white rounded-md p-2 border-2 hover:bg-gray-200">Batal</a>
          </DialogClose>
          <button @click="storeTransaction" type="submit" class="bg-blue-500 rounded-md p-2 text-white cursor-pointer hover:bg-sky-500">Bayar dan Cetak</button>
        </DialogFooter>
    </DialogContent>

  </Dialog>
</template>

<style scoped>

</style>
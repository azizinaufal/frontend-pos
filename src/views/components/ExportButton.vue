<script setup lang="ts">
import {defineProps} from 'vue';
import Api from "@/services/api.ts";
import Cookies from "js-cookie";
import {File} from 'lucide-vue-next';
// import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'
const props = defineProps({
  startDate : String,
  endDate : String,
  type : String,
});

const exportExcel = async () => {

  const token = Cookies.get("token");

    if (token){
      Api.defaults.headers.Authorization = token;
      try {
        const response = await Api.get(`/api/${props.type}/export?start_date=${props.startDate}&end_date=${props.endDate}`,{
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute(`download`,`report-${props.type}-${props.startDate}-${props.endDate}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      }catch(err){
        console.log("Gagal mendapatkan data", err);
      }
    }else{
      console.log("Token tidak valid")
    }


};
//
// function validateInput(){
//   if(!props.startDate || !props.endDate){
//     toast("Tanggal Awal dan Akhir Wajib Disii",{
//       type: "error",
//     });
//     return false
//   }
//   return true;
// }

</script>

<template>
  <button @click="exportExcel" class=" text-white w-full justify-center p-4 items-center bg-green-600 rounded-md h-8 hover:bg-sky-700 flex" :disabled="!props.startDate || !props.endDate">
    <File />
    Export
  </button>
</template>

<style scoped>

</style>
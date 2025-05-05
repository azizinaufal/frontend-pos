<script setup lang="ts">
//@ts-ignore
import * as  Cookies from 'js-cookie';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ref, onMounted, watchEffect } from "vue";
import Api from "@/services/api.js";

import { moneyFormat } from "@/utils/moneyFormat.ts";
import VueApexCharts from "vue3-apexcharts";

const countSalestoday = ref(0);
const sumSalesToday = ref(0);
const sumSalesWeek = ref(0);
const salesDate = ref([]);
const salesTotal = ref([]);
const salesChartOptions = ref({});
const salesChartSeries = ref([]);

const fetchData = async () => {
  const token =  Cookies.get("token");
  console.log(token);
  if (token) {
    try {
      Api.defaults.headers.common["Authorization"] = token;
      console.log(token);
      const response = await Api.get("/api/dashboard");
      console.log(response);

      countSalestoday.value = response.data.data.count_sales_today;
      sumSalesToday.value = response.data.data.sum_sales_today;
      sumSalesWeek.value = response.data.data.sum_sales_week;
      salesDate.value = response.data.data.sales_date;
      salesTotal.value = response.data.data.sales_total;
    } catch (error) {
      console.error("Error fetching dashboard data");
    }
  } else {
    console.error("Token tidak ada!");
  }
};

const commonChartOptions = {
  fontFamily: 'inherit',
  animations: { enabled: false },
  dataLabels: { enabled: false },
  grid: { strokeDashArray: 4 },
  tooltip: { theme: 'dark' },
  xaxis: {
    labels: { padding: 0 },
    tooltip: { enabled: false },
    axisBorder: { show: false },
    type: 'datetime',
  },
  yaxis: { labels: { padding: 4 } },
  colors: ['#206bc4'],
  legend: { show: false },
};

watchEffect(() => {
  if (salesTotal.value && salesTotal.value.length > 0) {
    salesChartSeries.value = [{
      name: "Sales",
      data: salesTotal.value,
    }];
    salesChartOptions.value = {
      ...commonChartOptions,
      chart: {
        type: "area",
        height: 160,
        sparkline: { enabled: true },
      },
      fill: { opacity: 0.16, type: 'solid' },
      stroke: { width: 2, lineCap: "round", curve: "smooth" },
      labels: salesDate.value,
      colors: ['#206bc4'],
    };
  }
});

onMounted(() => {
  fetchData();
});


</script>

<template>
  <div class="flex gap-4">
    <Card class="w-[300px] h-[200px]">
      <CardHeader>
        <CardTitle>Penjualan Hari Ini</CardTitle>
        <CardDescription>Hasil total penjualan hari ini</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-medium">{{ countSalestoday }}</div>
        <div class="my-2 h-0.5 border-t-0 bg-neutral-600 dark:bg-white/10"></div>
        <div class="pb-4 font-bold text-2xl">{{ moneyFormat(sumSalesToday) }}</div>
      </CardContent>
      <CardFooter class="flex justify-between px-6 pb-6"></CardFooter>
    </Card>

    <Card class="w-[300px] h-[200px]">
      <CardHeader>
        <CardTitle>Keuntungan Hari Ini</CardTitle>
      </CardHeader>
      <CardContent>
        <div>{{ countSalestoday }}</div>
        <div>{{ moneyFormat(sumSalesToday) }}</div>
      </CardContent>
      <CardFooter class="flex justify-between px-6 pb-6"></CardFooter>
    </Card>

    <Card class="w-[300px] h-[200px]">
      <CardHeader>
        <CardTitle>Penjualan</CardTitle>
        <CardDescription>7 Hari Terakhir</CardDescription>
      </CardHeader>
      <CardContent>
        <div>{{ moneyFormat(sumSalesWeek) }}</div>
        <div class="mt-4">
          <VueApexCharts
              type="area"
              height="160"
              :options="salesChartOptions"
              :series="salesChartSeries"
          />
        </div>
      </CardContent>
      <CardFooter class="flex justify-between px-6 pb-6"></CardFooter>
    </Card>

    <Card class="w-[300px] h-[200px]">
      <CardHeader>
        <CardTitle>Penjualan Hari Ini</CardTitle>
        <CardDescription>Hasil total penjualan hari ini</CardDescription>
      </CardHeader>
      <CardContent>
        <div>{{ countSalestoday }}</div>
        <div>{{ moneyFormat(sumSalesToday) }}</div>
      </CardContent>
      <CardFooter class="flex justify-between px-6 pb-6"></CardFooter>
    </Card>
  </div>
</template>

<style scoped>
</style>

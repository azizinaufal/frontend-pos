<script setup lang="ts">
import {defineProps, defineEmits} from 'vue';
import {getImageUrl} from "@/utils/getImageUrl.ts";
import {useHorizontalScroll} from '@/utils/useHorizontalScroll.ts';

const props = defineProps({
  categories: Array<{
    id: number;
    name: string;
    description: string;
    image: string;
  }>,
  fetchProducts:Function,
  fetchProductByCategoryID:Function,
  currentCategoryId:Number,
});
// const {categories} = defineProps({
//   categories: Array<{
//     id: number;
//     name: string;
//     description: string;
//     image: number;
//   }>
// });

const emit = defineEmits(['update:currentCategoryId']);
const { scrollRef, onMouseDown, onMouseLeave, onMouseUp, onMouseMove } = useHorizontalScroll();
</script>

<template>
<div class="flex flex-col m-6 md:flex-row gap-4 items-center">
  <div class="w-full md:w-1/6">
    <a href="#" class="block" @click.prevent="props.fetchProducts">
    <div  class="border bg-white hover:bg-gray-100 shadow-md rounded m-2 p-2 flex flex-col items-center justify-center text-center transition">
        <img src="/images/categories.png" alt="All Categories" class="w-14 h-14 p-2 mb-2"/>
        <h4 class="text-base font-semibold">All</h4>
      </div>
    </a>
  </div>

  <div class="w-full overflow-hidden">
    <div ref="scrollRef" class="flex gap-4 overflow-x-auto p-2 cursor-grab active:cursor-grabbing"
         @mousedown="onMouseDown"
         @mouseleave="onMouseLeave"
         @mouseup="onMouseUp"
         @mousemove="onMouseMove">
      <div v-for="category in props.categories" :key="category.id" class="flex-shrink-0 w-[150px] ">
        <a href="#" @click.prevent="() => {props.fetchProductByCategoryID(category.id);emit('update:currentCategoryId', category.id);}"
           class="block">
          <div class="border bg-white hover:bg-gray-100 shadow-md rounded-lg p-2 gap-1.5 flex  items-center justify-center text-center transition">
            <img :src="getImageUrl(category.image)" :alt="category.name" class="w-14 h-14 mb-2"/>
            <h4 class="text-base font-semibold ">{{ category.name }}</h4>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
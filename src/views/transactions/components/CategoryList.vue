<script setup lang="ts">
import {defineProps, defineEmits} from 'vue';
import {getImageUrl} from "@/utils/getImageUrl.ts";
import {LayoutDashboard} from "lucide-vue-next";
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
  <div class="flex flex-col m-4 gap-4 md:flex-row md:items-start">
    <!-- Tombol All -->
    <div class="w-full md:w-auto">
      <a href="#" @click.prevent="props.fetchProducts" class="block">
        <div class="border bg-white hover:bg-gray-100 shadow-md rounded-md p-4 flex flex-col items-center text-center transition">
          <LayoutDashboard class="w-14 h-14 p-2 mb-2" />
          <h4 class="text-base font-semibold">All</h4>
        </div>
      </a>
    </div>

    <!-- List Kategori Scrollable -->
    <div class="w-full overflow-hidden">
      <div
          ref="scrollRef"
          class="flex gap-4 overflow-x-auto p-2 cursor-grab active:cursor-grabbing scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
          @mousedown="onMouseDown"
          @mouseleave="onMouseLeave"
          @mouseup="onMouseUp"
          @mousemove="onMouseMove"
      >
        <div
            v-for="category in props.categories"
            :key="category.id"
            class="flex-shrink-0 w-[140px] sm:w-[160px]"
        >
          <a
              href="#"
              @click.prevent="() => {
            props.fetchProductByCategoryID(category.id);
            emit('update:currentCategoryId', category.id);
          }"
              class="block"
          >
            <div class="border bg-white hover:bg-gray-100 shadow-md rounded-lg p-2 flex flex-col items-center text-center transition">
              <img
                  :src="getImageUrl(category.image)"
                  :alt="category.name"
                  class="w-14 h-14 object-cover rounded-full mb-2"
              />
              <h4 class="text-sm font-semibold">{{ category.name }}</h4>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { getImageUrl } from '@/utils/getImageUrl.ts'
import { LayoutDashboard } from 'lucide-vue-next'
import { useHorizontalScroll } from '@/utils/useHorizontalScroll.ts'

const props = defineProps<{
  categories: Array<{
    id: number
    name: string
    description: string
    image: string
  }>
  fetchProducts: (pageNumber?: number) => void
  fetchProductByCategoryID: (categoryId: number, pageNumber?: number) => void
  currentCategoryId: number
}>()

const emit = defineEmits(['update:currentCategoryId'])
const handleFetchProducts = (event: Event) => {
  event.preventDefault()
  props.fetchProducts(1) // Mulai dari halaman 1
}

const handleCategoryClick = (event: Event, categoryId: number) => {
  event.preventDefault()
  props.fetchProductByCategoryID(categoryId, 1) // Mulai dari halaman 1
  emit('update:currentCategoryId', categoryId)
}

const { scrollRef, onMouseDown, onMouseLeave, onMouseUp, onMouseMove } = useHorizontalScroll()
</script>

<template>
  <div class="flex flex-col m-4 gap-4 md:flex-row md:items-start">
    <!-- Tombol All -->
    <div class="w-full md:w-auto">
      <a href="#"  @click="handleFetchProducts" class="block">
        <div
            class="border bg-white hover:bg-gray-100 shadow-md rounded-md p-4 flex flex-col items-center text-center transition"
        >
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
        <div v-for="category in categories" :key="category.id" class="flex-shrink-0 w-[140px] sm:w-[160px]">
          <a
              href="#"
              @click="(event) => handleCategoryClick(event, category.id)"
              class="block"
          >
            <div
                class="border bg-white hover:bg-gray-100 shadow-md rounded-lg p-2 flex flex-col items-center text-center transition"
            >
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

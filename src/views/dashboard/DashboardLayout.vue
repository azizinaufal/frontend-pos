<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import {useUser} from "@/stores/user.ts";
import {useRouter} from "vue-router";
import { ref, onMounted, onUnmounted } from 'vue'
const userStore = useUser();
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
const router = useRouter();

const logoutHandler = () => {
  userStore.logout();
  return router.push({ path: "/login", replace: true });
};
const showDropdown = ref<boolean>(false);
const dropdownRef = ref<HTMLElement | null>(null);
const handleClickOutside = (event: MouseEvent): void => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

</script>


  <template>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger class="-ml-1" />
          <nav class="flex item-center justify-between w-full">
            <div class="flex items-center justify-center gap-1 ">
              <img src="../../../public/images/kasirin.png " alt="Logo Kasir.in" class="w-10 h-10 rounded-full object-cover border-2">
              <h3 class="font-bold font-fredoka">KASIRIN.ME</h3>
            </div>
            <div class="relative" ref="dropdownRef">
              <div class="flex items-center justify-center gap-1 cursor-pointer" @click="showDropdown = !showDropdown">
                <div class="flex h-8 w-8 items-start justify-center overflow-hidden rounded-full border border-slate-800 bg-slate-50 shadow-[2px_2px_0px_rgba(0,0,0,1)] lg:cursor-pointer">
                  <img src="../../../public/images/profile.png" alt="Avatar Image" class="aspect-square h-full w-full object-cover">

                </div>
                <div class="flex flex-col gap-0.25">
                  <p class="font-semibold text-sm">{{ userStore.user?.name }}</p>
                  <p class="text-gray-600 text-xs">{{ userStore.user?.email }}</p>
                </div>
              </div>
              <div v-if="showDropdown" class="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg z-50">
                <button @click="logoutHandler" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            </div>
          </nav>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4">
          <router-view />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </template>

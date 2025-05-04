<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  type SidebarProps,
} from '@/components/ui/sidebar'

import { GalleryVerticalEnd } from 'lucide-vue-next'

const props = withDefaults(defineProps<SidebarProps>(), {
  variant: 'sidebar',
})

// This is sample data.
const data = {
  navMain: [
    {
      title: 'HOME',
      url: '#',
      items: [

      ],
    },
    {
      title: 'MASTERS',
      url: '#',
      items: [
        {
          title: 'Categories',
          url: '#',
        },
        {
          title: 'Products',
          url: '#',
          isActive: true,
        },
      ],
    },
    {
      title: 'CUSTOMERS',
      url: '#',
      items: [

      ],
    },
    {
      title: 'TRANSACTIOS',
      url: '#',
      items: [

      ],
    },
    {
      title: 'REPORTS',
      url: '#',
      items: [
        {
          title: 'Sales',
          url: '#',
        },
        {
          title: 'Profits',
          url: '#',
        },
      ],

    },
    {
      title: 'USERS',
      url: '#',
      items: [

      ],

    },
  ],
}
</script>
<script lang="ts">
// import { useRouter, useRoute } from "vue-router";
// const router = useRouter();
// const route = useRoute();
// const isActive = (path) => {
//   if (Array.isArray(path)) {
//     return path.some((p) => route.path.startsWith(p));
//   }
//   return route.path.startsWith(path);
// };
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <a href="#">
              <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd class="size-4" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-medium">Point of Sales Kasir.in by</span>
                <span class="">Naufal Azizi</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu class="gap-2 font">
          <SidebarMenuItem v-for="item in data.navMain" :key="item.title" class="font-medium">
            <SidebarMenuButton as-child>
              <a :href="item.url" class="font-bold ">
                {{ item.title }}
              </a>
            </SidebarMenuButton>
            <SidebarMenuSub v-if="item.items.length" class="ml-0 border-l-0 px-1.5">
              <SidebarMenuSubItem v-for="childItem in item.items" :key="childItem.title">
                <SidebarMenuSubButton as-child :is-active="childItem.isActive">
                  <a :href="childItem.url">{{ childItem.title }}</a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>

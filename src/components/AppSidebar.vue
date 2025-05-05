<script setup lang="ts">
import {useRoute} from "vue-router";
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

const route = useRoute();
const isActive = (path:string) => {
  if (Array.isArray(path)) {
    return route.path.startsWith(path);
  }
  return route.path.startsWith(path);
};
const props = withDefaults(defineProps<SidebarProps>(), {
  variant: 'sidebar',
})

// This is sample data.
const data = {
  navMain: [
    {
      title: 'DASHBOARD',
      url: '/dashboard',
      items: [

      ],
    },
    {
      title: 'MASTERS',
      url: '/masters',
      items: [
        {
          title: 'Categories',
          url: '/categories',
        },
        {
          title: 'Products',
          url: '/products',
          isActive: true,
        },
      ],
    },
    {
      title: 'CUSTOMERS',
      url: '/customers',
      items: [

      ],
    },
    {
      title: 'TRANSACTIOS',
      url: '/transactions',
      items: [

      ],
    },
    {
      title: 'REPORTS',
      url: '/reports',
      items: [
        {
          title: 'Sales',
          url: '/sales',
        },
        {
          title: 'Profits',
          url: '/profits',
        },
      ],

    },
    {
      title: 'USERS',
      url: '/users',
      items: [

      ],

    },
  ],
}
</script>
<script lang="ts">

</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <RouterLink to="/home">
              <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd class="size-4" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-medium">Point of Sales Kasir.in by</span>
                <span class="">Naufal Azizi</span>
              </div>
            </RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu class="gap-2 font">
          <SidebarMenuItem v-for="item in data.navMain" :key="item.title" >
            <SidebarMenuButton as-child :is-active="isActive(item.url)">
              <RouterLink :to="item.url" class="font-bold">{{item.title}} </RouterLink>
            </SidebarMenuButton>
            <SidebarMenuSub v-if="item.items.length" class="ml-0 border-l-0 px-1.5">
              <SidebarMenuSubItem v-for="childItem in item.items" :key="childItem.title">
                <SidebarMenuSubButton as-child :is-active="isActive(childItem.url)">
                 <RouterLink :to="childItem.url" class="font-medium">{{childItem.title}}</RouterLink>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>

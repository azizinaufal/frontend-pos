<script setup lang="ts">
import {useRoute} from "vue-router";
import {
  LayoutDashboard,
  KeyRound,
  ChartBarStacked,
  UserRound,
  PackageSearch,
  BanknoteArrowUp,
  ClipboardPlus,
  BadgeDollarSign,
  BadgePercent,
  UserRoundPen
} from "lucide-vue-next";
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
      icon: LayoutDashboard,
      title: 'DASHBOARD',
      url: '/dashboard',
      items: [

      ],
    },
    {
      icon: KeyRound,
      title: 'MASTERS',
      url: '#',
      items: [
        {
          icon: ChartBarStacked,
          title: 'Categories',
          url: '/categories',
        },
        {
          icon: PackageSearch,
          title: 'Products',
          url: '/products',
          isActive: true,
        },
      ],
    },
    {
      icon: UserRound ,
      title: 'CUSTOMERS',
      url: '/customers',
      items: [

      ],
    },
    {
      icon: BanknoteArrowUp,
      title: 'TRANSACTIOS',
      url: '/transactions',
      items: [

      ],
    },
    {
      icon: ClipboardPlus,
      title: 'REPORTS',
      url: '#',
      items: [
        {
          icon: BadgeDollarSign,
          title: 'Sales',
          url: '/sales',
        },
        {
          icon: BadgePercent,
          title: 'Profits',
          url: '/profits',
        },
      ],

    },
    {icon: UserRoundPen,
      title: 'PROFIL',
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
            <RouterLink to="/">
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
              <RouterLink :to="item.url" class=" font-bold"><component :is="item.icon" class="size-4" /> {{item.title}}</RouterLink>
            </SidebarMenuButton>
            <SidebarMenuSub v-if="item.items.length" class="ml-0 border-l-0 ">
              <SidebarMenuSubItem v-for="childItem in item.items" :key="childItem.title">
                <SidebarMenuSubButton as-child :is-active="isActive(childItem.url)">
                 <RouterLink :to="childItem.url" class="font-medium">
                   <component :is="childItem.icon" class="size-4" />
                   <span>{{childItem.title}}</span>
                 </RouterLink>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>

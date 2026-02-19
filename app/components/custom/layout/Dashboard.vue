<template>
  <SidebarProvider>
    <ClientOnly>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <NuxtLink to="/">
                <h1 class="font-bold text-3xl px-2 py-3 dark:text-blue-200">
                  <span class="text-primary">blog</span>mandu
                </h1>
              </NuxtLink>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent class="py-4">
          <SidebarGroup class="space-y-3">
            <SidebarGroupLabel>Author Console</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu class="gap-4">
                <SidebarMenuItem
                  v-for="item in SIDEBAR_MENU_ITEMS_AUTHOR"
                  :key="item.title"
                >
                  <NuxtLink :to="`/u/dashboard/${item.href}`">
                    <Button
                      as-child
                      variant="ghost"
                      type="button"
                      class="py-4 w-full justify-start dark:text-foreground cursor-pointer"
                      :class="{
                        'dark:bg-accent bg-primary text-primary-foreground dark:hover:bg-accent! hover:bg-primary hover:text-primary-foreground dark:hover:text-foreground!':
                          `/u/dashboard/${item.href}` === route.path,
                      }"
                    >
                      <section class="flex items-center gap-4">
                        <LayoutDashboard v-if="item.id === 'dashboard'" />
                        <BookOpenText v-if="item.id === 'posts'" />
                        <LucideMessagesSquare v-if="item.id === 'comments'" />
                        <TrendingUp v-if="item.id === 'analytics'" />
                        <User2 v-if="item.id === 'edit_profile'" />

                        <Bell v-if="item.id === 'notifications'" />

                        <span>{{ item.title }}</span>
                      </section>
                    </Button>
                  </NuxtLink>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>

      <SidebarInset>
        <Blogmenu />

        <DashboardContent
          :title="route.path.split('/').filter(Boolean).pop() as string"
        >
          <section class="h-full m-2 space-y-8">
            <slot />
          </section>
        </DashboardContent>
      </SidebarInset>
    </ClientOnly>
  </SidebarProvider>
</template>

<script setup lang="ts">
import {
  Bell,
  BookOpenText,
  LayoutDashboard,
  LucideMessagesSquare,
  TrendingUp,
  User2,
} from "lucide-vue-next";
import { Button } from "~/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "~/components/ui/sidebar";
import Blogmenu from "../navbar/Blogmenu.vue";
import DashboardContent from "./DashboardContent.vue";

const route = useRoute();
</script>

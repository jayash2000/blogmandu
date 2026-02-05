<template>
  <SidebarProvider>
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <h1 class="font-bold text-3xl px-2 py-3 dark:text-blue-200">
              <span class="text-primary">blog</span>mandu
            </h1>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent class="py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu class="gap-4">
              <SidebarMenuItem
                v-for="item in SIDEBAR_MENU_ITEMS"
                :key="item.title"
              >
                <Button
                  as-child
                  variant="ghost"
                  @click="activeTab = item.id"
                  class="py-4 w-full justify-start dark:text-foreground cursor-pointer"
                  :class="{
                    'dark:bg-accent bg-primary text-primary-foreground hover:bg-accent! hover:text-foreground!':
                      activeTab === item.id,
                  }"
                >
                  <section class="flex items-center gap-4">
                    <Box v-if="item.id === 'overview'" />
                    <Pen v-if="item.id === 'post_management'" />
                    <User2 v-if="item.id === 'user_management'" />
                    <LucideMessageSquareText
                      v-if="item.id === 'comment_moderation'"
                    />
                    <Clock v-if="item.id === 'scheduled_posts'" />
                    <Bell v-if="item.id === 'notifications'" />

                    <span>{{ item.title }}</span>
                  </section>
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>

    <SidebarInset>
      <slot />
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang="ts">
import {
  Bell,
  Box,
  Clock,
  GalleryHorizontalEnd,
  LucideMessageSquareText,
  Pen,
  User2,
} from "lucide-vue-next";

const activeTab = useState<string>("dashboard", () => "overview");
</script>

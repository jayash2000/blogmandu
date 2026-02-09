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
        <slot name="sidebar-content" />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>

    <SidebarInset>
      <Blogmenu />
      <slot name="sidebar-inset" />
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang="ts">
import {
  Bell,
  BookOpenText,
  Clock,
  LayoutDashboard,
  LucideMessageSquareText,
  LucideMessagesSquare,
  Pen,
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

// defineProps<{
//   menus: { id: string; title: string }[];
// }>();

const activeTab = useState<string>("dashboard", () => "overview");
</script>

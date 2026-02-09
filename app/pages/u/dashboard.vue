<template>
  <Dashboard>
    <template #sidebar-content>
      <SidebarGroup class="space-y-3">
        <SidebarGroupLabel>Author Console</SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu class="gap-4">
            <SidebarMenuItem
              v-for="item in SIDEBAR_MENU_ITEMS_AUTHOR"
              :key="item.title"
            >
              <Button
                as-child
                variant="ghost"
                @click="
                  activeTab = item.id;
                  activeTabTitle = item.title;
                "
                class="py-4 w-full justify-start dark:text-foreground cursor-pointer"
                :class="{
                  'dark:bg-accent bg-primary text-primary-foreground dark:hover:bg-accent! hover:bg-primary hover:text-primary-foreground dark:hover:text-foreground!':
                    activeTab === item.id,
                }"
              >
                <section class="flex items-center gap-4">
                  <!-- admin
                  <LayoutDashboard v-if="item.id === 'overview'" />
                  <Pen v-if="item.id === 'post_management'" />
                  <User2 v-if="item.id === 'user_management'" />
                  <LucideMessageSquareText
                    v-if="item.id === 'comment_moderation'"
                  />
                  <Clock v-if="item.id === 'scheduled_posts'" /> -->

                  <LayoutDashboard v-if="item.id === 'dashboard'" />
                  <BookOpenText v-if="item.id === 'posts'" />
                  <LucideMessagesSquare v-if="item.id === 'comments'" />
                  <TrendingUp v-if="item.id === 'analytics'" />
                  <User2 v-if="item.id === 'edit_profile'" />

                  <Bell v-if="item.id === 'notifications'" />

                  <span>{{ item.title }}</span>
                </section>
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </template>

    <template #sidebar-inset>
      <section class="h-full m-2 p-8 space-y-8">
        <H1 :title="activeTabTitle" />

        <section v-if="activeTab === 'dashboard'" class="space-y-12">
          <section
            class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          >
            <DInsightCard
              v-for="i in insights"
              :key="i.id"
              :title="i.title"
              :icon="i.icon"
              :number="i.number"
            />
          </section>

          <section class="grid grid-cols-1 md:grid-cols-2 pr-8 gap-6">
            <DPostCard
              id="recent-posts"
              title="Recent Posts"
              :posts="AUTHOR_DASHBOARD_RECENT_POSTS"
            />

            <DPostCard
              id="top-posts"
              title="Top Posts"
              :posts="AUTHOR_DASHBOARD_RECENT_POSTS"
            />
          </section>
        </section>

        <section v-if="activeTab === 'posts'">
          <DPostTable />
        </section>

        <section v-if="activeTab === 'comments'">Comments</section>

        <section v-if="activeTab === 'analytics'">Analytics</section>

        <section v-if="activeTab === 'edit_profile'">Edit Profile</section>

        <section v-if="activeTab === 'notifications'">Notifications</section>
      </section>
    </template>
  </Dashboard>
</template>

<script setup lang="ts">
import {
  Bell,
  BookOpen,
  BookOpenText,
  Check,
  LayoutDashboard,
  LucideMessagesSquare,
  MessageCircle,
  ThumbsUp,
  TrendingUp,
  User2,
} from "lucide-vue-next";
import DPostCard from "~/components/custom/card/dashboard/DPostCard.vue";
import DInsightCard from "~/components/custom/card/dashboard/DInsightCard.vue";
import H1 from "~/components/custom/headings/H1.vue";
import Dashboard from "~/components/custom/layout/Dashboard.vue";
import DPostTable from "~/components/custom/table/posts/DPostTable.vue";

const activeTab = ref<string>("dashboard");
const activeTabTitle = ref<string>("Dashboard");

const insights = [
  { id: "total_posts", title: "Total Posts", icon: BookOpen, number: 20 },
  { id: "active_posts", title: "Active Posts", icon: Check, number: 15 },
  { id: "total_likes", title: "Total Likes", icon: ThumbsUp, number: 124 },
  {
    id: "total_comments",
    title: "Total Comments",
    icon: MessageCircle,
    number: 45,
  },
];
</script>

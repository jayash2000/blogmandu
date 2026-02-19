<template>
  <Dashboard>
    <section v-if="activeTab === 'dashboard'" class="space-y-12">
      <section class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Insight
          v-for="i in insights"
          :key="i.id"
          :id="i.id"
          :title="i.title"
          :icon="i.icon"
        />
      </section>

      <section class="grid grid-cols-1 md:grid-cols-2 pr-8 gap-6">
        <Post
          id="recent-posts"
          title="Recent Posts"
          :posts="AUTHOR_DASHBOARD_RECENT_POSTS"
        />

        <Post
          id="top-posts"
          title="Top Posts"
          :posts="AUTHOR_DASHBOARD_RECENT_POSTS"
        />
      </section>
    </section>
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
import Insight from "~/components/custom/card/dashboard/Insight.vue";
import Post from "~/components/custom/card/dashboard/Post.vue";
import Heading1 from "~/components/custom/headings/Heading1.vue";
import Dashboard from "~/components/custom/layout/Dashboard.vue";
import DPostTable from "~/components/custom/table/posts/DPostTable.vue";

const activeTab = ref<string>("dashboard");
const activeTabTitle = ref<string>("Dashboard");

const insights = [
  { id: "total_posts", title: "Total Posts", icon: BookOpen },
  { id: "active_posts", title: "Active Posts", icon: Check },
  { id: "total_likes", title: "Total Likes", icon: ThumbsUp },
  {
    id: "total_comments",
    title: "Total Comments",
    icon: MessageCircle,
    number: 45,
  },
];
</script>

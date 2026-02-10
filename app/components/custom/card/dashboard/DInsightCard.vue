<template>
  <Card class="max-w-3xs w-full">
    <CardTitle class="flex justify-between items-center font-thin text-sm px-4">
      {{ title }}

      <component :is="icon" class="size-4 text-primary" />
    </CardTitle>

    <CardContent class="text-3xl font-bold -ml-2 font-mono">
      <span v-if="id === 'total_posts'">
        {{ postStore.posts.count || 0 }}
      </span>

      <span v-else>0</span>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { BookOpen, type LucideProps } from "lucide-vue-next";
import type { FunctionalComponent } from "vue";

defineProps<{
  id: string;
  title: string;
  icon: FunctionalComponent<LucideProps, {}, any, {}>;
}>();

const postStore = usePostStore();
const route = useRoute();

const loadPosts = async () => {
  await postStore.fetchAllPosts();
};

await loadPosts();
console.log(postStore.posts);

watch(
  () => postStore.posts || route.query,
  () => loadPosts,
  { deep: true },
);
</script>

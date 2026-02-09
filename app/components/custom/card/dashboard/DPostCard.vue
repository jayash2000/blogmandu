<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
    </CardHeader>

    <CardContent>
      <section class="space-y-4">
        <section
          v-for="post in posts"
          :key="post.id"
          class="flex items-center justify-between pb-2 border-b"
        >
          <span class="text-sm max-w-xs w-full overflow-x-hidden">
            {{ post.title }}
          </span>

          <span
            v-if="id === 'recent-posts'"
            class="text-xs text-muted-foreground"
          >
            {{ post.time }}
          </span>

          <Badge
            v-if="id === 'top-posts'"
            variant="outline"
            class="text-primary"
            >{{ 10 }} likes</Badge
          >
        </section>
      </section>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  posts: Record<string, string | number>[];
  id: "recent-posts" | "top-posts";
}>();
</script>

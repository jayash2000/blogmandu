<template>
  <Card
    class="max-w-md p-0 pb-4 overflow-hidden cursor-pointer dark:hover:bg-slate-800 hover:brightness-75 hover:bg-accent"
  >
    <CardTitle>
      <figure class="w-full h-40 overflow-hidden">
        <img
          src="https://plus.unsplash.com/premium_photo-1666432045848-3fdbb2c74531?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="beach"
          class="w-full h-full object-cover"
        />
      </figure>
    </CardTitle>

    <CardContent class="flex flex-col justify-between gap-4">
      <PostBadge id="technology" />

      <h2 class="font-semibold">{{ post.post?.title }}</h2>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Badge } from "~/components/ui/badge";
import PostBadge from "../badge/PostBadge.vue";
import type { Post } from "~/types/api.types";

defineProps<{
  post: Post;
}>();
</script>

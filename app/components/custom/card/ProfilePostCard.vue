<template>
  <Card class="max-w-xs p-0 pb-4 overflow-hidden">
    <CardTitle>
      <!-- img  -->
      <figure class="w-full h-50 overflow-hidden">
        <img
          src="https://plus.unsplash.com/premium_photo-1666432045848-3fdbb2c74531?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="beach"
          class="w-full h-full object-cover"
        />
      </figure>
    </CardTitle>

    <CardContent>
      <article class="flex flex-col gap-4 justify-between h-30">
        <h2 class="font-semibold text-lg">
          {{ post?.title }}
        </h2>

        <p
          class="text-xs text-muted-foreground text-justify line-clamp-3 prose"
          v-html="post?.contentMarkdown"
        ></p>

        <section class="flex items-center justify-between gap-2 text-xs">
          <span>
            {{
              new Date(post?.createdAt)
                .toUTCString()
                .split(" ")
                .slice(0, 4)
                .join(" ")
            }}
          </span>

          <NuxtLink
            :to="`/post/${post?.id}`"
            class="text-primary font-semibold hover:underline hover:underline-offset-2"
            >Read More</NuxtLink
          >
        </section>
      </article>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { LikedPosts, Post } from "~/types/api.types";

const props = defineProps<{
  post: Post
}>();

const auth = useAuthStore();
</script>

<style scoped></style>

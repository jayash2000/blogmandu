<template>
  <NuxtLink :to="`post/${post.post.id}`">
    <Card
      class="max-w-xs p-0 pb-4 overflow-hidden cursor-pointer dark:hover:bg-slate-800 hover:brightness-75 hover:bg-accent"
    >
      <CardTitle class="">
        <!-- img  -->
        <figure class="w-full h-60 overflow-hidden">
          <img
            src="https://plus.unsplash.com/premium_photo-1666432045848-3fdbb2c74531?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="beach"
            class="w-full h-full object-cover"
          />
        </figure>
      </CardTitle>

      <CardContent>
        <article class="flex flex-col gap-4">
          <h2 class="font-semibold text-lg text-justify">
            {{ post.post.title }}
          </h2>

          <section class="flex items-center gap-2 text-xs">
            <Avatar
              v-if="auth.isAuthenticated"
              class="cursor-pointer hover:brightness-75 bg-foreground flex justify-center items-center"
            >
              <AvatarImage v-if="auth.user?.image" src="" />

              <span
                v-if="!auth.user?.image"
                class="text-background font-medium"
              >
                {{ post.author?.name?.[0] }}
              </span>
            </Avatar>

            <span class="font-medium">{{ post.author.name }}</span>

            <Icon name="mdi:circle" size="5" class="mx-2" />

            <span>
              {{
                new Date((post.post.createdAt as Date).toString())
                  .toUTCString()
                  .split(" ")
                  .slice(0, 4)
                  .join(" ")
              }}
            </span>
          </section>

          <p class="text-xs text-muted-foreground text-justify line-clamp-3">
            Dive deep into the world of React Hooks and revolutionize your
            component logic. This guide covers useState, useEffect, useContext,
            and custom hooks with practical examples to elevate your React
            projects.
          </p>
        </article>
      </CardContent>
    </Card>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Post } from "~/types/api.types";

defineProps<{
  post: Post;
}>();

const auth = useAuthStore();
</script>

<style scoped></style>

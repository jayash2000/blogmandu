<template>
  <Card class="max-w-xs p-0 pb-4 overflow-hidden">
    <CardTitle>
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
          The Rise of AI in Content Creation
        </h2>

        <p class="text-xs text-muted-foreground text-justify line-clamp-3">
          Dive deep into the world of React Hooks and revolutionize your
          component logic. This guide covers useState, useEffect, useContext,
          and custom hooks with practical examples to elevate your React
          projects.
        </p>

        <section class="flex items-center justify-between gap-2 text-xs">
          <span>
            {{
              new Date(Date.now())
                .toUTCString()
                .split(" ")
                .slice(0, 4)
                .join(" ")
            }}
          </span>

          <NuxtLink
            :to="`/post/${'1'}`"
            class="text-primary font-semibold hover:underline hover:underline-offset-2"
            >Read More</NuxtLink
          >
        </section>
      </article>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
const auth = useAuthStore();
</script>

<style scoped></style>

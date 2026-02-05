<template>
  <Card class="max-w-md p-0 pb-4 overflow-hidden">
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

      <h2 class="font-semibold">The Future of AI in Content Creation</h2>

      <p class="line-clamp-3 text-justify text-sm">
        Artificial intelligence is rapidly transforming the landscape of content
        creation, offering innovative tools for writers, designers, and
      </p>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Badge } from "~/components/ui/badge";
import PostBadge from "../badge/PostBadge.vue";
</script>

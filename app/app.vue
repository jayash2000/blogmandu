<template>
  <NuxtLayout class="relative">
    <NuxtPage />

    <section class="flex justify-end fixed w-full z-50 bottom-4 right-4">
      <Toaster />
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Toaster } from "~/components/ui/sonner";
</script>

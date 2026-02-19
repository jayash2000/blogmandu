<template>
  <section class="h-full m-2 p-8 space-y-8">
    <Heading1 :title="title" />

    <slot />
  </section>
</template>

<script setup lang="ts">
import Heading1 from "../headings/Heading1.vue";

defineProps<{
  title: string;
}>();
</script>

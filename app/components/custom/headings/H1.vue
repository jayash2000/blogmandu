<template>
  <h1 class="text-2xl font-bold" :class="class">
    {{ title }}
  </h1>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  class?: string;
}>();
</script>

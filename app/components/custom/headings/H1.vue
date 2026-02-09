<template>
  <h1 class="text-2xl font-bold capitalize" :class="class">
    {{ title }}
  </h1>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  class?: string;
}>();
</script>

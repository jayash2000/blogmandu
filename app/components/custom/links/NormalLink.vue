<template>
  <NuxtLink
    :to="to"
    class="text-primary dark:text-blue-400 text-sm font-medium hover:text-blue-600 dark:hover:text-accent-foreground hover:underline hover:underline-offset-2"
  >
    {{ text }}
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string;
  text: string;
}>();
</script>

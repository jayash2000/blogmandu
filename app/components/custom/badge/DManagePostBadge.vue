<template>
  <Badge
    :variant="colorMode.preference === 'dark' ? 'default' : 'outline'"
    class="font-semibold capitalize"
    :class="{
      'not-dark:text-green-500 not-dark:border-green-500 dark:bg-green-500':
        id === 'published',
      'not-dark:text-red-400 not-dark:border-red-400 dark:bg-red-400':
        id === 'draft',
    }"
  >
    {{ id }}
  </Badge>
</template>

<script setup lang="ts">
import { Badge } from "~/components/ui/badge";

defineProps<{
  id: "published" | "draft";
}>();

const colorMode = useColorMode();
</script>

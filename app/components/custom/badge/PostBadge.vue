<template>
  <Badge
    :variant="colorMode.preference === 'dark' ? 'default' : 'outline'"
    class="font-semibold capitalize"
    :class="{
      'not-dark:text-teal-500 not-dark:border-teal-500 dark:bg-teal-500':
        id === 'technology',
      'not-dark:text-lime-400 not-dark:border-lime-400 dark:bg-lime-400':
        id === 'lifestyle',
      'not-dark:text-blue-400 not-dark:border-blue-400 dark:bg-blue-400':
        id === 'business',
      'not-dark:text-slate-400 not-dark:border-slate-400 dark:bg-slate-400':
        id === 'science',
      'not-dark:text-emerald-400 not-dark:border-emerald-400 dark:bg-emerald-400':
        id === 'education',
      'not-dark:text-indigo-400 not-dark:border-indigo-400 dark:bg-indigo-400':
        id === 'health',
    }"
  >
    {{ props.id }}
  </Badge>
</template>

<script setup lang="ts">
import { Badge } from "~/components/ui/badge";

const props = defineProps<{
  id:
    | "technology"
    | "lifestyle"
    | "business"
    | "science"
    | "education"
    | "health";
}>();

const colorMode = useColorMode();
</script>

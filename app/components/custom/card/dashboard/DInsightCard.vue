<template>
  <Card class="max-w-3xs w-full">
    <CardTitle class="flex justify-between items-center font-thin text-sm px-4">
      {{ title }}

      <component :is="icon" class="size-4 text-primary" />
    </CardTitle>

    <CardContent class="text-3xl font-bold -ml-2 font-mono">
      {{ number }}
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { BookOpen, type LucideProps } from "lucide-vue-next";
import type { FunctionalComponent } from "vue";

defineProps<{
  title: string;
  icon: FunctionalComponent<LucideProps, {}, any, {}>;
  number: number;
}>();
</script>

<template>
  <Button
    variant="outline"
    class="w-fit mx-auto rounded-full"
    @click="toggleTheme"
  >
    <Icon
      icon="radix-icons:moon"
      :class="{
        hidden: colorMode.value === 'dark',
      }"
    ></Icon>

    <Icon
      icon="radix-icons:sun"
      :class="{
        hidden: colorMode.value === 'light',
      }"
    ></Icon>
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>

<script setup lang="ts">
import { Button } from "./ui/button";
import { Icon } from "@iconify/vue";

const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>

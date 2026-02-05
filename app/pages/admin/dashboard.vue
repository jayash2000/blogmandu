<template>
  <Admin>
    <section v-for="item in SIDEBAR_MENU_ITEMS" :key="item.id">
      <span v-if="item.id === activeTab">
        {{ item.title }}
      </span>
    </section>
  </Admin>
</template>

<script setup lang="ts">
import Admin from "~/components/custom/layout/Admin.vue";

const activeTab = useState<string>("dashboard");
</script>

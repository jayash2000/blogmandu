<template>
  <Dashboard :menus="SIDEBAR_MENU_ITEMS_ADMIN">
    <section v-for="item in SIDEBAR_MENU_ITEMS_ADMIN" :key="item.id">
      <span v-if="item.id === activeTab">
        {{ item.title }}
      </span>
    </section>
  </Dashboard>
</template>

<script setup lang="ts">
import Dashboard from "~/components/custom/layout/Dashboard.vue";

const activeTab = useState<string>("dashboard");
</script>

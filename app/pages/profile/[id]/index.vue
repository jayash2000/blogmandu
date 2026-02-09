<template>
  <section
    class="flex flex-1 flex-col gap-12 items-center justify-center w-full py-8 px-6"
  >
    <ProfileCard />

    <section class="self-start space-y-8">
      <H1 title="Published Posts" />

      <section class="grid grid-cols-1 md:grid-rows-2 lg:grid-cols-4 gap-8">
        <ProfilePostCard v-for="value in [1, 2, 3, 4, 5, 6, 7]" />
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import ProfileCard from "~/components/custom/card/ProfileCard.vue";
import ProfilePostCard from "~/components/custom/card/ProfilePostCard.vue";
import H1 from "~/components/custom/headings/H1.vue";
</script>

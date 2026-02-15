<template>
  <section class="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800 px-4">
    <section class="text-center">
      <Heading1 title="404"
        class="text-9xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400 mb-4" />

      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        Page Not Found
      </h2>
      <p class="text-lg text-slate-400 mb-8 max-w-md mx-auto">
        Sorry, the page you're looking for doesn't exist. It might have been
        moved or deleted.
      </p>
      <div class="flex gap-4 justify-center flex-wrap">
        <NuxtLink to="/"
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
          Go Home
        </NuxtLink>
      </div>
    </section>
  </section>
</template>

<script setup>
import Heading1 from "~/components/custom/headings/Heading1.vue";

definePageMeta({
  layout: false,
});
</script>

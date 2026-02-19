<template>
  <section
    class="min-h-screen flex flex-col"
    :class="{
      'justify-between': auth.isAuthenticated && auth.user?.role === 'user',
      'justify-center': [
        '/login',
        '/register',
        '/forgot-password',
        '/reset-password',
        '/admin/login',
      ].includes(route.path),
    }"
  >
    <header>
      <Blogmenu
        v-if="
          ![
            '/login',
            '/register',
            '/forgot-password',
            '/reset-password',
            '/admin/login',
            '/admin/dashboard',
          ].includes(route.path) && !route.path.startsWith('/u/dashboard')
        "
      />
    </header>

    <main
      class="min-h-[80vh] py-2 px-6"
      :class="{
        'py-0!': route.path.startsWith('/u/dashboard'),
      }"
    >
      <slot />
    </main>

    <footer
      v-if="
        ![
          '/login',
          '/register',
          '/forgot-password',
          '/reset-password',
          '/admin/login',
        ].includes(route.path) &&
        !route.path.startsWith('/u/dashboard') &&
        auth.user?.role !== 'admin'
      "
      class="bg-muted border-t-2 border-border text-muted-foreground text-sm flex justify-between items-center py-6 px-6"
    >
      <p>
        &copy; {{ new Date().getFullYear() }}
        <span class="text-primary">blogmandu</span>. All rights reserved.
      </p>

      <ul class="flex gap-4 items-center">
        <NuxtLink to="#">
          <Icon name="uil:facebook" size="25" class="z-0 hover:text-primary" />
        </NuxtLink>

        <NuxtLink to="#">
          <Icon name="uil:github" size="25" class="z-0 hover:text-primary" />
        </NuxtLink>

        <NuxtLink to="#">
          <Icon name="uil:linkedin" size="25" class="z-0 hover:text-primary" />
        </NuxtLink>
      </ul>
    </footer>
  </section>
</template>

<script setup lang="ts">
import Blogmenu from "~/components/custom/navbar/Blogmenu.vue";

const auth = useAuthStore();

const route = useRoute();
</script>

<style scoped></style>

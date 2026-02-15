<template>
  <Card class="max-w-4xl w-full">
    <CardContent class="flex flex-col items-center gap-4">
      <Avatar class="cursor-pointer hover:brightness-75 bg-foreground flex justify-center items-center size-30">
        <AvatarImage src="https://github.com/test.png" />
      </Avatar>

      <Heading1 title="John Nepali" />

      <p class="text-center max-w-4/5 text-sm">
        John Nepali is a seasoned tech journalist with over a decade of
        experience covering artificial intelligence, software development, and
        the future of digital communication. Her insights are highly valued by
        industry professionals and aspiring developers alike.
      </p>

      <section class="flex items-center gap-4">
        <Button class="p-3 cursor-pointer text-sm">
          <Icon name="uil:plus" />
          Follow
        </Button>

        <Button v-if="auth.isAuthenticated && route.params.id === auth.user?.id" variant="outline">
          Edit Profile
        </Button>
      </section>

      <ul class="flex items-center gap-4 pt-4">
        <NuxtLink :to="link.href" v-for="link in PROFILE_LINKS" :key="link.id">
          <Icon :name="link.name" size="25"
            class="hover:text-primary/80 dark:hover:text-accent-foreground cursor-pointer" />
        </NuxtLink>
      </ul>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import Heading1 from '../headings/Heading1.vue';


const auth = useAuthStore();

const route = useRoute();
</script>

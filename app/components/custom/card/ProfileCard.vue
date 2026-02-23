<template>
  <Card class="max-w-4xl w-full">
    <CardContent class="flex flex-col items-center gap-4">
      <Avatar
        class="cursor-pointer hover:brightness-75 bg-foreground flex justify-center items-center size-30"
      >
        <AvatarImage src="https://github.com/test.png" />
      </Avatar>

      <Heading1 :title="user?.name as string" />

      <section class="text-sm py-2">
        <span v-if="!user?.bio" class="text-muted-foreground select-none">
          No bio yet
        </span>

        <p v-if="user?.bio" class="text-center max-w-4/">
          <!-- bio -->
        </p>
      </section>

      <section class="flex items-center gap-4">
        <Button
          class="p-3 cursor-pointer text-sm"
          v-if="user?.email !== auth.authUser?.email"
        >
          <Icon name="uil:plus" />
          Follow
        </Button>

        <Button
          v-if="auth.isAuthenticated && user?.email === auth.authUser?.email"
          variant="outline"
        >
          Edit Profile
        </Button>
      </section>

      <ul class="flex items-center gap-4 pt-4">
        <NuxtLink :to="link.href" v-for="link in PROFILE_LINKS" :key="link.id">
          <Icon
            :name="link.name"
            size="25"
            class="hover:text-primary/80 dark:hover:text-accent-foreground cursor-pointer"
          />
        </NuxtLink>
      </ul>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import Heading1 from "../headings/Heading1.vue";

const props = defineProps<{
  user: Record<string, string>;
}>();

const auth = useAuthStore();
</script>

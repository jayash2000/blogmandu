<template>
  <Card class="py-4">
    <CardContent class="flex flex-col items-center gap-2">
      <Avatar
        class="size-12 cursor-pointer hover:brightness-75 bg-foreground flex justify-center items-center"
      >
        <!-- <AvatarImage src="https://www.github.com/user.png" /> -->
        <!-- <span v-if="!auth.user?.image" class="text-background font-medium">
          {{ auth.user?.name?.[0] }}
        </span> -->
      </Avatar>

      <span class="font-semibold">Random User</span>

      <span class="text-muted-foreground text-sm -mt-2">18 posts</span>
    </CardContent>

    <CardFooter>
      <Button
        class="w-full cursor-pointer dark:bg-primary dark:hover:bg-primary/80"
        variant="outline"
      >
        Follow
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
const auth = useAuthStore();
</script>

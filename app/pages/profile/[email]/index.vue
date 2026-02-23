<template>
  <section
    class="flex flex-1 flex-col gap-12 items-center justify-center w-full py-8 px-6"
  >
    <ProfileCard :user="authStore.user as Record<string, string>" />

    <section class="self-start space-y-8 w-full">
      <Heading1 title="Published Posts" />

      <UserPosts>
        <template #published-posts>
          <section
            v-if="postStore.posts.length"
            class="grid grid-cols-1 md:grid-rows-2 lg:grid-cols-4 gap-8"
          >
            <ProfilePostCard
              :post="post"
              v-for="post in postStore.posts as Post[]"
            />
          </section>

          <div
            v-if="!postStore.posts.length"
            class="text-muted-foreground text-sm w-full text-center pt-12"
          >
            No published posts
          </div>
        </template>

        <template #liked-posts>
          <section
            v-if="likeStore.userLikedPosts?.length"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <ProfilePostCard
              :post="post.post"
              v-for="post in likeStore.userLikedPosts as LikedPosts[]"
            />
          </section>

          <div
            v-if="!likeStore.userLikedPosts?.length"
            class="text-muted-foreground text-sm w-full text-center pt-12"
          >
            No liked posts
          </div>
        </template>

        <template #bookmarked-posts>
          <div class="text-muted-foreground text-sm w-full text-center pt-12">
            No bookmarked posts
          </div>
        </template>
      </UserPosts>
    </section>
  </section>
</template>

<script setup lang="ts">
import ProfileCard from "~/components/custom/card/ProfileCard.vue";
import ProfilePostCard from "~/components/custom/card/ProfilePostCard.vue";
import Heading1 from "~/components/custom/headings/Heading1.vue";
import UserPosts from "~/components/custom/tabs/UserPosts.vue";
import type { LikedPosts, Post } from "~/types/api.types";

const route = useRoute();

const authStore = useAuthStore();
const postStore = usePostStore();
const likeStore = useLikeStore();

if (!route.params.email) {
  navigateTo("/not-found");
}

onMounted(async () => {
  await authStore.fetchUser(route.params.email as string).then(async () => {
    await postStore.fetchMyPost();
    await likeStore.fetchLikedPostsByUser();
  });
});
</script>

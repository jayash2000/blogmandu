<template>
  <section class="px-12 py-4 space-y-12">
    <article class="space-y-4">
      <Heading1 title="Featured Post" />
      <FeaturedCard />
    </article>

    <section class="flex gap-12">
      <article class="space-y-4">
        <section class="flex items-end justify-between">
          <Heading1 title="Recent Articles" />

          <NormalLink to="/recent-posts" text="See all" />
        </section>

        <section class="grid grid-cols-3 gap-6">
          <PostCard
            v-for="value in postStore.posts as PostWithAuthor[]"
            :post="value"
            :key="value.post.id" 
            />
        </section>
      </article>

      <div class="bg-muted-foreground/30 px-[0.05vw]"></div>

      <section class="space-y-4">
        <Heading1 title="Discover Authors" />

        <section class="space-y-4">
          <UserCard v-for="value in [1, 2, 3]" />
        </section>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import FeaturedCard from "~/components/custom/card/FeaturedCard.vue";
import PostCard from "~/components/custom/card/PostCard.vue";
import UserCard from "~/components/custom/card/UserCard.vue";
import Heading1 from "~/components/custom/headings/Heading1.vue";
import NormalLink from "~/components/custom/links/NormalLink.vue";
import type { PostWithAuthor } from "~/types/api.types";

const route = useRoute();

const auth = useAuthStore();
const postStore = usePostStore();

const loadPosts = async () => {
  await postStore.fetchPostByOffset({ limit: 6 });
};

await loadPosts();
console.log(postStore.posts);

watch(() => route.query || route.path, loadPosts, {
  deep: true,
});
</script>

<style scoped></style>

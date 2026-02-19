<template>
  <section class="h-full flex flex-col items-center gap-8 py-4 px-8 pb-12">
    <section class="text-center space-y-2">
      <Heading1 title="Recent Articles" />

      <p class="text-muted-foreground text-sm">
        Explore the freshest perspectives and latest insights from our community
        of writers.
      </p>
    </section>

    <!-- Filters and Sorting -->
    <section
      class="lg:w-full flex flex-col lg:flex-row lg:items-center justify-between px-4 py-2 bg-accent/50 dark:bg-card rounded-full"
    >
      <ul class="hidden lg:flex gap-4 items-center text-xs">
        <li
          v-for="filter in POSTS_FILTER_MENU"
          :key="filter.id"
          class="cursor-pointer py-1 px-2 rounded-full font-semibold hover:bg-primary/30 hover:text-primary select-none"
          :class="{
            'bg-primary text-white hover:bg-primary! hover:text-white':
              activeFilter === filter.id,
          }"
          @click="activeFilter = filter.id"
        >
          {{ filter.label }}
        </li>
      </ul>

      <section class="flex items-center gap-4 text-sm">
        <span>Sort by:</span>

        <ClientOnly>
          <Select>
            <SelectTrigger class="bg-white lg:w-34 pl-4 rounded-full!">
              <SelectValue placeholder="Newest first" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort options</SelectLabel>

                <SelectItem
                  v-for="sort in POSTS_SORT_MENU"
                  :key="sort.id"
                  :value="sort.id"
                >
                  {{ sort.label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </ClientOnly>
      </section>
    </section>

    <!-- Loading -->
    <span v-if="postStore.loading">Loading...</span>

    <!-- Posts -->
    <section
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full px-4"
    >
      <ClientOnly>
        <Main
          v-for="value in postStore.posts as PostWithAuthor[]"
          :key="value.post.id"
          :post="value"
          @click="navigateTo(`/post/${value.post?.id}`)"
        />
      </ClientOnly>
    </section>

    <ClientOnly>
      <Button
        v-if="postStore.hasNextPage"
        class="cursor-pointer"
        :disabled="postStore.loading"
        @click="loadMore"
      >
        {{ postStore.loading ? "Loading..." : "View more posts" }}
        <Icon name="uil:arrow-down" class="text-lg" />
      </Button>

      <div
        v-if="!postStore.hasNextPage"
        class="text-muted-foreground/50 text-sm mt-4 flex flex-col gap-2 items-center"
      >
        You are all caught up for now
        <Verified />
      </div>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import { Verified } from "lucide-vue-next";
import Main from "~/components/custom/card/Main.vue";
import Heading1 from "~/components/custom/headings/Heading1.vue";
import type { PostWithAuthor } from "~/types/api.types";

const route = useRoute();

const postStore = usePostStore();

const activeFilter = ref("all");
const sortOrder = ref<"asc" | "desc">("desc");

const lastPost = computed(() => {
  return postStore.posts[postStore.posts.length - 1] as PostWithAuthor;
});

const loadInitial = async () => {
  await postStore.fetchPostByOffset({
    limit: 8,
    order: sortOrder.value,
  });
};

const loadMore = async () => {
  // console.log(postStore.hasNextPage, "next");

  if (!postStore.hasNextPage) return;

  await postStore.loadMore(
    {
      limit: 8,
      order: sortOrder.value,
      cursor: {
        id: lastPost?.value?.post.id as string,
        createdAt: lastPost?.value?.post.createdAt as Date,
      },
    },
    true,
  );
};

onMounted(async () => {
  await loadInitial().then(() => postStore.setHasNextPage(true));
});
</script>

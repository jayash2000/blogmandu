<template>
  <section class="h-full flex flex-col items-center gap-8 py-4 px-8 pb-12">
    <section class="text-center space-y-2">
      <H1 title="Recent Articles" />

      <p class="text-muted-foreground text-sm">
        Explore the freshest perspectives and latest insights from our community
        of writers.
      </p>
    </section>

    <section
      class="lg:w-full flex flex-col lg:flex-row lg:items-center justify-between px-4 py-2 bg-accent/50 dark:bg-card rounded-full"
    >
      <ul class="hidden lg:flex gap-4 items-center text-xs">
        <li
          class="cursor-pointer py-1 px-2 rounded-full font-semibold hover:bg-primary/30 hover:text-primary select-none"
          v-for="filter in POSTS_FILTER_MENU"
          :key="filter.id"
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

    <span v-if="post.loading">Loading...</span>

    <section
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full px-4"
    >
      <ClientOnly>
        <Main
          v-for="value in post.posts.data"
          :key="value.posts.id as PropertyKey"
          :post="value"
          @click="navigateTo(`/post/${value.posts.id}`)"
        />
      </ClientOnly>
    </section>

    <ClientOnly>
      <Button class="cursor-pointer">
        View more posts
        <Icon name="uil:arrow-down" class="text-lg" />
      </Button>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import Main from "~/components/custom/card/Main.vue";
import H1 from "~/components/custom/headings/H1.vue";

const activeFilter = ref("all");

const route = useRoute();
const post = usePostStore();

const loadPosts = async () => {
  await post.fetchPostByOffset({
    limit: 12,
  });
};

await loadPosts();
// console.log(post.posts, "post");

watch(() => route.query || route.path || post.posts.data, loadPosts, {
  deep: true,
});
</script>

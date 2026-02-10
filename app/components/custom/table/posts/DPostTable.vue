<template>
  <ClientOnly>
    <Table>
      <TableHeader class="bg-card">
        <TableRow>
          <TableHead class="not-dark:font-semibold tracking-wide w-1/3">
            Title
          </TableHead>

          <TableHead class="not-dark:font-semibold tracking-wide">
            Status
          </TableHead>

          <TableHead class="not-dark:font-semibold tracking-wide">
            Category
          </TableHead>

          <TableHead class="not-dark:font-semibold tracking-wide">
            Publish Date
          </TableHead>

          <TableHead class="not-dark:font-semibold tracking-wide w-3/20">
            Likes
          </TableHead>

          <TableHead class="not-dark:font-semibold tracking-wide w-1/10">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow v-for="post in postStore.posts.data" :key="post.posts.id">
          <TableCell class="py-2!">
            <div class="lg:max-w-80 overflow-x-hidden text-ellipsis">
              {{ post.posts.title }}
            </div>
          </TableCell>

          <TableCell>
            <DManagePostBadge :id="post.posts.status || 'draft'" />
          </TableCell>

          <TableCell class="capitalize">
            {{ post.posts.category || "technology" }}
          </TableCell>

          <TableCell>
            {{ post.posts.createdAt.split("T")[0] }}
          </TableCell>

          <TableCell>
            {{ new Intl.NumberFormat("en-US").format(post.posts.likes || 0) }}
          </TableCell>

          <TableCell>
            <DPostTableDialog
              :doubt="`Are you sure you want to publish this post?`"
              warning="You cannot undo this action."
            >
              <template #trigger>
                <!-- ${post.posts.status === 'published' ? 'publish' : 'unpublish'}  -->
                <Button variant="ghost">
                  <!-- <EyeOffIcon v-if="post.posts.status === 'published'" />
                  <EyeIcon v-else /> -->
                  <EyeIcon />
                </Button>
              </template>

              <template #action>
                <Button type="button" variant="outline">
                  <!-- v-if="post.posts.status === 'published'" -->
                  Publish
                </Button>

                <!-- <Button type="button" variant="outline"> -->
                <!-- v-else -->
                <!-- Save to draft
                  <PenBoxIcon />
                </Button> -->
              </template>
            </DPostTableDialog>

            <DPostTableDialog
              doubt="Are you sure you want to delete this post?"
              warning="This action will permanently delete your post."
            >
              <template #trigger>
                <Button variant="ghost">
                  <Trash />
                </Button>
              </template>

              <template #action>
                <Button type="button" variant="destructive">Delete</Button>
              </template>
            </DPostTableDialog>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <Pagination
      v-slot="{ page }"
      :items-per-page="10"
      :total="postStore.posts.count"
      :default-page="1"
      class="justify-end mt-4"
    >
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious />

        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === page"
            @click="
              async () =>
                await postStore.fetchPostByOffset({ page: item.value })
            "
          >
            {{ item.value }}
          </PaginationItem>
        </template>

        <PaginationEllipsis :index="5" />

        <PaginationNext />
      </PaginationContent>
    </Pagination>
  </ClientOnly>
</template>

<script setup lang="ts">
import { EyeIcon, Trash } from "lucide-vue-next";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import DManagePostBadge from "../../badge/DManagePostBadge.vue";
import DPostTableDialog from "../../dialog/DPostTableDialog.vue";

const route = useRoute();

const auth = useAuthStore();
const postStore = usePostStore();

const loadPosts = async () => {
  await postStore.fetchPostByOffset({});
};

await loadPosts();
console.log(postStore.posts);

watch(() => postStore.posts || route.path || route.query, loadPosts, {
  deep: true,
});
</script>

<template>
  <Card class="space-y-6 p-4 bg-card" v-if="commentStore.comments.length">
    <!-- loading state -->
    <section v-if="commentStore.loading" class="flex gap-4 py-4 items-center">
      <Skeleton
        class="relative flex size-8 shrink-0 overflow-hidden rounded-full"
      />

      <section class="space-y-2 w-full">
        <Skeleton class="size-4 w-full" />
        <Skeleton class="size-4 w-full" />
      </section>
    </section>

    <!-- comments -->
    <section class="space-y-2">
      <CommentItem
        v-for="comment in commentStore.comments"
        :key="comment.comments.id"
        :comment="comment"
        :post-id="postId"
      />
    </section>

    <!-- load more -->
    <section class="flex justify-center items-center">
      <div
        v-if="!commentStore.hasNextPage"
        class="text-muted-foreground/50 text-sm mt-4 flex gap-2 justify-center items-center"
      >
        End of comments
        <LucideVerified :size="20" />
      </div>

      <Button
        v-else
        variant="outline"
        class="mx-auto"
        @click="commentStore.loadMore(postId)"
      >
        Load More
      </Button>
    </section>
  </Card>
</template>

<script setup lang="ts">
import { LucideVerified } from "lucide-vue-next";
import { Skeleton } from "~/components/ui/skeleton";
import CommentItem from "./CommentItem.vue";

const props = defineProps<{
  postId: string;
}>();

// console.log(props.postId, "post-id");

const commentStore = useCommentStore();

onMounted(async () => {
  await commentStore.fetchComments(props.postId);
  console.log(commentStore.comments);
});
</script>

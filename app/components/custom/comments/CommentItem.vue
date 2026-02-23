<template>
  <section :style="indentation">
    <section class="flex flex-col">
      <section class="flex gap-4 py-2">
        <Avatar
          class="cursor-pointer hover:brightness-75 bg-foreground flex justify-center items-center"
        >
          <AvatarImage src="https://www.github.com/hello.png" />
        </Avatar>

        <section class="space-y-2 text-sm">
          <div class="flex items-center gap-4">
            <NuxtLink :to="`/profile/${comment.user?.email}`">

              <span class="font-semibold">
                {{ comment.user?.name }}
              </span>
            </NuxtLink>

            <span class="text-muted-foreground">
              {{
                new Date(comment.comments.createdAt)
                  .toUTCString()
                  .split(" ")
                  .slice(0, 4)
                  .join(" ")
              }}
            </span>
          </div>

          <p
            class="text-justify"
            :class="{
              'text-muted-foreground mb-3 italic tracking-wide select-none':
                comment.comments.isDeleted,
            }"
          >
            {{ comment.comments.content }}
          </p>
        </section>
      </section>

      <!-- action buttons -->
      <section class="pl-8 -mt-2">
        <Button
          variant="link"
          v-if="!comment.comments.isDeleted"
          @click="isReplyFormOpen = true"
        >
          Reply
        </Button>

        <Button
          variant="link"
          class="text-destructive"
          @click="deleteComment"
          v-if="
            authStore.authUser?.id === comment.user?.id &&
            !comment.comments.isDeleted
          "
          :disabled="commentStore.loading && isDeleteButtonClicked"
        >
          Delete
        </Button>
      </section>
    </section>

    <section class="px-12 py-4" v-if="isReplyFormOpen">
      <form @submit="onSubmit" class="space-y-4">
        <FieldGroup>
          <VeeField name="content" v-slot="{ field, errors }">
            <Field :data-invalid="!!errors.length">
              <Textarea
                placeholder="Write your comment here..."
                v-bind="field"
                :aria-invalid="!!errors.length"
              />

              <FieldError v-if="errors.length" :errors="errors" />
            </Field>
          </VeeField>
        </FieldGroup>

        <Button :disabled="commentStore.loading">
          <div
            v-if="commentStore.loading && isSubmitButtonClicked"
            class="flex items-center gap-2"
          >
            Submitting...
            <Loader class="animate-spin" />
          </div>

          <span v-else> Post Comment </span>
        </Button>
      </form>
    </section>

    <Separator />

    <!-- children -->
    <section v-if="comment.children?.length" class="space-y-2 mt-2">
      <CommentItem
        v-for="child in comment.children"
        :key="child.comments.id"
        :comment="child"
      />
    </section>
  </section>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { Loader } from "lucide-vue-next";
import { useForm, Field as VeeField } from "vee-validate";
import type { CommentNode } from "~/types/comment.type";
import { commentSchema } from "~~/shared/schema/comment.schema";

const props = defineProps<{
  comment: CommentNode;
  postId?: string;
}>();

const isDeleteButtonClicked = ref(false);
const isSubmitButtonClicked = ref(false);
const isReplyFormOpen = ref(false);

console.log(props.comment.comments.postId, "post-id");

const indentation = computed(() => ({
  marginLeft: `${props.comment.comments.depth === 0 ? 0 : props.comment.comments.depth + 3}vw`,
}));

const route = useRoute();

const commentStore = useCommentStore();
const authStore = useAuthStore();

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(commentSchema),
  initialValues: {
    content: "",
  },
});

const onSubmit = handleSubmit(async (values) => {
  // console.log(values);
  isSubmitButtonClicked.value = true;

  await commentStore.replyComment(
    route.params.id as string,
    props.comment.comments.id,
    values.content,
  );

  if (!commentStore.response?.success) {
    showToast("error", commentStore.error as string);
    return;
  }

  resetForm();
  showToast("success", commentStore.response?.message as string);

  // refresh comments
  await commentStore.refresh(route.params.id as string);

  isReplyFormOpen.value = false;
});

const deleteComment = async () => {
  isDeleteButtonClicked.value = true;

  await commentStore
    .deleteComment(route.params.id as string, props.comment.comments.id)
    .then(() => (isDeleteButtonClicked.value = false));

  await commentStore.refresh(route.params.id as string);
};
</script>

<template>
  <section v-if="postStore.loading">Loading...</section>

  <section v-if="!postStore.loading" class="h-full px-12 py-8">
    <ClientOnly>
      <Heading1
        :title="postStore.post?.post?.title as string"
        class="text-3xl font-black"
      />

      <section class="flex items-center gap-4 py-4">
        <Avatar
          class="cursor-pointer hover:brightness-75 bg-foreground flex justify-center items-center"
        >
          <AvatarImage src="https://www.github.com/bot.png" />
        </Avatar>

        <span class="text-primary font-medium text-sm">{{
          postStore.post?.author?.name
        }}</span>

        <div class="text-sm">
          Published on
          <span class="font-semibold text-accent-foreground">
            {{
              new Date(postStore.post?.post?.createdAt as Date)
                .toUTCString()
                .split(" ")
                .slice(0, 4)
                .join(" ")
            }}

            <!-- {{ postStore.post?.post.createdAt }} -->
          </span>
        </div>
      </section>

      <section class="flex items-center gap-4">
        <Button
          variant="outline"
          type="button"
          class="p-3 cursor-pointer"
          v-for="icon in POST_DETAIL_BUTTONS_ICON"
          :key="icon.id"
          @click="() => handleClick(icon.id)"
        >
          <Icon
            :name="icon.name"
            :class="{
              'text-destructive!': icon.id === 'like' && likeStore.isLiked,
            }"
          />
        </Button>
      </section>

      <article class="flex flex-col gap-6 py-4">
        <figure class="w-full h-[60vh] rounded overflow-hidden">
          <img
            src="https://plus.unsplash.com/premium_photo-1666432045848-3fdbb2c74531?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="beach"
            class="w-full h-full object-cover"
          />
        </figure>

        <p
          class="text-justify font-thin prose"
          v-html="postStore.post?.post.contentMarkdown"
        ></p>

        <section class="space-x-4">
          <Badge variant="secondary"> Mindfulness </Badge>
          <Badge variant="secondary"> Wellness </Badge>
          <Badge variant="secondary"> Self-Improvement </Badge>
          <Badge variant="secondary"> Meditation </Badge>
          <Badge variant="secondary"> Inner Peace </Badge>
        </section>
      </article>

      <section class="py-4 space-y-4">
        <Heading1 title="Comments(3)" />

        <Textarea placeholder="Write your comment here..." v-model="comment" />

        <Button>Post Comment</Button>
      </section>

      <section class="flex gap-4 py-4">
        <Avatar
          class="cursor-pointer hover:brightness-75 bg-foreground flex justify-center items-center"
        >
          <AvatarImage src="https://www.github.com/hello.png" />
        </Avatar>

        <section class="space-y-2 text-sm">
          <div class="flex items-center gap-2">
            <span class="font-semibold">Mark Watt</span>
            <span class="text-muted-foreground">2 hours ago</span>
          </div>

          <p class="text-justify">
            This is a truly insightful article. I've been looking for ways to
            integrate more mindfulness into my daily routine, and your practical
            tips are very helpful. Thank you!
          </p>
        </section>
      </section>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";
import Heading1 from "~/components/custom/headings/Heading1.vue";
import { Textarea } from "~/components/ui/textarea";

const comment = ref<string>("");

const postStore = usePostStore();
const likeStore = useLikeStore();

const route = useRoute();

const handleClick = async (id: string) => {
  if (id === "like") {
    await likeStore.toggleLike(route.params.id as string).then(async () => {
      if (likeStore.error) {
        toast.error(likeStore.error, {
          class:
            "bg-destructive text-white p-4 rounded-sm w-fit flex items-center absolute bottom-4 right-4 gap-2 text-sm",
          duration: 2000,
        });
        return;
      }

      toast.success(likeStore.message, {
        class:
          "bg-pink-600 text-white p-4 rounded-sm w-fit flex items-center absolute bottom-4 right-4 gap-2 text-sm z-50",
        duration: 2000,
      });

      await likeStore.checkLikeStatus(route.params.id as string);
    });
  }
};

onMounted(async () => {
  await postStore.fetchPostById(route.params.id as string);

  if (postStore.post) {
    await likeStore.checkLikeStatus(route.params.id as string);
  }

  if (!postStore.loading && postStore.error) {
    // return navigateTo("/not-found");
  }
});
</script>

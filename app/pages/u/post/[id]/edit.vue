<template>
  <section class="h-full py-4 px-8 flex flex-col gap-8">
    <Heading1 title="Edit Post" class="text-3xl" />

    <form @submit.prevent="handleSubmit" class="w-full">
      <section class="flex items-start justify-between gap-8">
        <section class="w-full bg-card p-8 rounded-md border shadow-md shadow-card">
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel for="title">Title</FieldLabel>
                <Input type="text" id="title" placeholder="Tech Blog..." class="focus:ring-1!"
                  v-model="createPostForm.title" />
              </Field>

              <Field>
                <FieldLabel for="title">Content</FieldLabel>

                <section class="grid items-end gap-4" :class="{ 'grid-cols-2': mdActive }">
                  <PostContentTabs v-model:text-value="createPostForm.contentEditor"
                    v-model:markdown-value="createPostForm.contentMarkdown" v-model:md-active="mdActive" />

                  <section v-if="mdActive" class="border rounded-md p-4 h-full">
                    <span v-if="!createPostForm.contentMarkdown" class="text-muted-foreground text-sm">
                      Live Preview
                    </span>

                    <section class="prose dark:prose-invert max-w-none" v-html="preview"></section>
                  </section>
                </section>
              </Field>

              <Field>
                <FieldLabel for="categories">Categories</FieldLabel>
                <Select v-model="createPostForm.categories">
                  <SelectTrigger class="bg-background!">
                    <SelectValue placeholder="Select categories" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category Options</SelectLabel>

                      <SelectItem value="ai"> AI </SelectItem>
                      <SelectItem value="frontend"> Frontend </SelectItem>
                      <SelectItem value="backend"> Backend </SelectItem>
                      <SelectItem value="cloud"> Cloud </SelectItem>
                      <SelectItem value="management"> Management </SelectItem>
                      <SelectItem value="networking"> Networking</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel for="featured-image">Featured Image</FieldLabel>

                <section>
                  <input type="file" id="featured-image" ref="imageUpload" class="hidden" accept="image/*" @change="
                    (event) =>
                    (currentFile =
                      (event.target as HTMLInputElement).files?.[0] ?? null)
                  " />

                  <Item variant="outline"
                    class="border-dashed bg-accent dark:bg-accent-foreground dark:text-accent w-full h-full cursor-pointer"
                    @click="openFileDialog">
                    <span v-if="!currentFile"> Click to upload image </span>

                    <figure v-else class="h-[20vh] w-full overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1769631417306-a1da09f42b20?q=80&w=1193&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="nature" />
                    </figure>
                  </Item>
                </section>
              </Field>
            </FieldGroup>
          </FieldSet>
        </section>

        <section class="max-w-xs w-full flex flex-col gap-4">
          <Card class="px-5 py-4 flex flex-col gap-4">
            <Heading1 title="Publish Settings" class="text-lg" />

            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel for="status">Status</FieldLabel>
                  <Select v-model="createPostForm.status">
                    <SelectTrigger class="bg-background!">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="published"> Published </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel for="visibility">Visibility</FieldLabel>

                  <Select v-model="createPostForm.visibility">
                    <SelectTrigger class="bg-background!">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Visibility Options</SelectLabel>
                        <SelectItem value="public"> Public </SelectItem>
                        <SelectItem value="private"> Private </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>
            </FieldSet>
          </Card>

          <Card class="px-5 py-4 flex flex-col gap-4">
            <Heading1 title="Metadata" class="text-lg" />

            <div class="text-sm">
              Author: <span class="text-primary">{{ auth.user?.name }}</span>
            </div>
          </Card>

          <Button type="submit" class="flex items-center gap-1 cursor-pointer">
            Edit Post
            <Icon name="uil:edit" class="text-base" />
          </Button>

          <!-- <Button
          variant="outline"
          class="flex items-center gap-1 cursor-pointer"
        >
          Save Draft
          <Icon name="uil:save" class="text-lg" />
        </Button> -->

          <Button type="button" variant="outline" class="flex items-center gap-1 cursor-pointer">
            Cancel
          </Button>
        </section>
      </section>
    </form>
  </section>
</template>

<script setup lang="ts">
import TiptapEditor from "~/components/custom/editor/TiptapEditor.vue";
import Heading1 from "~/components/custom/headings/Heading1.vue";
import PostContentTabs from "~/components/custom/tabs/PostContentTabs.vue";
import { Item, ItemActions } from "~/components/ui/item";

const createPostForm = reactive({
  title: "",
  contentEditor: "",
  contentMarkdown: "",
  categories: "",
  image: "",
  status: "",
  visibility: "",
});

const preview = ref("");
const mdActive = ref(false);

const imageUpload = ref<HTMLInputElement | null>(null);
const currentFile = ref<File | null>(null);

const openFileDialog = () => {
  imageUpload.value?.click();
};

const auth = useAuthStore();

watch(
  () => createPostForm.contentMarkdown,
  async (value) => {
    console.log(mdActive, "active");

    preview.value = await parseMarkdownClient(value);
  },
);

const handleSubmit = () => {
  console.log(createPostForm);
};
</script>

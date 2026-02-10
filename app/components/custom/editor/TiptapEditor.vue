<template>
  <section class="border rounded-md p-2 flex flex-col gap-2">
    <EditorToolbar :editor="editor" />

    <EditorContent
      :editor="editor"
      class="w-full min-h-40 max-h-40 overflow-y-auto p-2 border rounded-md prose dark:prose-invert max-w-none"
    />
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

import { Markdown } from "@tiptap/markdown";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/vue-3";
import EditorToolbar from "./EditorToolbar.vue";
import Code from "@tiptap/extension-code";

const CustomCode = Code.extend({
  name: "customCode",
});

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Markdown,
    CustomCode.configure({
      HTMLAttributes: {
        class: "bg-muted py-1 px-2",
      },
    }),
  ],

  onUpdate({ editor }) {
    emit("update:modelValue", editor.getHTML());
  },
});

onMounted(() => {
  if (editor.value?.view.dom) {
    editor.value.view.dom.classList.add("focus:outline-none");
  }
});
</script>

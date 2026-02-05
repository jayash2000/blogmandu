<template>
  <Tabs default-value="text-editor">
    <TabsList>
      <TabsTrigger
        value="text-editor"
        class="cursor-pointer"
        @click="emit('update:mdActive', false)"
      >
        Text Editor
      </TabsTrigger>

      <TabsTrigger
        value="markdown"
        class="cursor-pointer"
        @click="emit('update:mdActive', true)"
      >
        Markdown
      </TabsTrigger>
    </TabsList>

    <TabsContent value="text-editor">
      <TiptapEditor
        :model-value="textValue as string"
        @update:model-value="emit('update:textValue', $event)"
      />
    </TabsContent>

    <TabsContent value="markdown">
      <Textarea
        :model-value="markdownValue"
        @update:model-value="emit('update:markdownValue', $event)"
        placeholder="Your markdown content here..."
        class="max-w-xl w-full"
      />
    </TabsContent>
  </Tabs>
</template>

<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import TiptapEditor from "../editor/TiptapEditor.vue";

const props = defineProps<{
  mdActive?: boolean;
  textValue?: string;
  markdownValue?: string;
}>();

const emit = defineEmits<{
  "update:textValue": [value: string];
  "update:markdownValue": [value: string | number];
  "update:mdActive": [value: boolean];
}>();
</script>

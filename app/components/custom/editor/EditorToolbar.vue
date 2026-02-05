<template>
  <section>
    <ButtonGroup>
      <Button
        v-for="btn in MD_TOOLBAR_BUTTONS"
        :key="btn.id"
        size="sm"
        variant="outline"
        class="cursor-pointer"
        @click="
          isActive = !isActive;
          handleButtonClick(btn.id);
        "
        :class="{
          'bg-primary! text-white!': activeBtn === btn.id && isActive,
        }"
      >
        {{ btn.text }}
      </Button>
    </ButtonGroup>
  </section>
</template>

<script setup lang="ts">
import { ButtonGroup } from "~/components/ui/button-group";

const props = defineProps<{ editor: any }>();

const activeBtn = ref("");
const isActive = ref(false);

const handleButtonClick = (id: string) => {
  if (id === "bold") {
    props.editor.chain().focus().toggleBold().run();
  }

  if (id === "italic") {
    props.editor.chain().focus().toggleItalic().run();
  }

  if (id === "underline") {
    props.editor.chain().focus().toggleUnderline().run();
  }

  if (id === "h1") {
    props.editor.chain().focus().toggleHeading({ level: 1 }).run();
  }

  if (id === "h2") {
    props.editor.chain().focus().toggleHeading({ level: 2 }).run();
  }

  if (id === "h3") {
    props.editor.chain().focus().toggleHeading({ level: 3 }).run();
  }
};
</script>

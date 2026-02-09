<template>
  <section>
    <ButtonGroup>
      <Button
        v-for="btn in MD_TOOLBAR_BUTTONS"
        :key="btn.id"
        size="sm"
        variant="outline"
        type="button"
        class="cursor-pointer"
        @click="
          activeBtn.includes(btn.id)
            ? activeBtn.length >= 2
              ? activeBtn.splice(
                  activeBtn.findIndex((b) => b === btn.id),
                  1,
                )
              : activeBtn.pop()
            : activeBtn.push(btn.id);
          handleButtonClick(btn.id);
        "
        :class="{
          'bg-primary! text-white!': activeBtn.includes(btn.id),
        }"
      >
        <Icon v-if="btn.id === 'code'" name="mdi:code" />

        <span v-if="btn.id !== 'code'">
          {{ btn.text }}
        </span>
      </Button>
    </ButtonGroup>
  </section>
</template>

<script setup lang="ts">
import { ButtonGroup } from "~/components/ui/button-group";

const props = defineProps<{ editor: any }>();

const activeBtn = ref<string[]>([]);
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

  if (id === "strike") {
    props.editor.chain().focus().toggleStrike().run();
  }

  if (id === "code") {
    props.editor.chain().focus().toggleCode().run();
  }
};
</script>

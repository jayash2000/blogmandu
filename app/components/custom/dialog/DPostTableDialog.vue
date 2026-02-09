<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>

    <DialogContent :show-close-button="false" class="space-y-4">
      <DialogHeader>
        <DialogTitle> {{ doubt }} </DialogTitle>

        <DialogDescription>
          {{ warning }}
        </DialogDescription>
      </DialogHeader>

      <DialogFooter class="flex justify-start! gap-4">
        <slot name="action" />

        <DialogClose>
          <Button type="button" variant="default">Cancel</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

defineProps<{
  doubt: string;
  warning: string;
}>();
</script>

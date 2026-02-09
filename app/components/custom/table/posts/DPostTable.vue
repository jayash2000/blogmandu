<template>
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
      <TableRow v-for="post in AUTHOR_DASHBOARD_MANAGE_POSTS" :key="post.id">
        <TableCell class="py-4!">
          <div class="lg:max-w-80 overflow-x-hidden text-ellipsis">
            {{ post.title }}
          </div>
        </TableCell>

        <TableCell>
          <DManagePostBadge :id="post.status as 'published' | 'draft'">
            {{ post.status }}
          </DManagePostBadge>
        </TableCell>

        <TableCell class="capitalize">
          {{ post.category }}
        </TableCell>

        <TableCell>
          {{ post.dateCreated.split("T")[0] }}
        </TableCell>

        <TableCell>
          {{ new Intl.NumberFormat("en-US").format(post.likes) }}
        </TableCell>

        <TableCell>
          <DPostTableDialog
            :doubt="`Are you sure you want to ${post.status === 'published' ? 'publish' : 'unpublish'} this post?`"
            warning="You cannot undo this action."
          >
            <template #trigger>
              <Button variant="ghost">
                <EyeOffIcon v-if="post.status === 'published'" />
                <EyeIcon v-else />
              </Button>
            </template>

            <template #action>
              <Button
                type="button"
                variant="outline"
                v-if="post.status === 'published'"
              >
                Publish
              </Button>

              <Button type="button" variant="outline" v-else>
                Save to draft
                <PenBoxIcon />
              </Button>
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
</template>

<script setup lang="ts">
import { EyeIcon, EyeOffIcon, PenBoxIcon, Trash } from "lucide-vue-next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import DManagePostBadge from "../../badge/DManagePostBadge.vue";
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
import DPostTableDialog from "../../dialog/DPostTableDialog.vue";

const auth = useAuthStore();
</script>

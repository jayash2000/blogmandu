<template>
  <Tabs default-value="publish">
    <TabsList class="bg-card">
      <TabsTrigger
        value="publish"
        class="cursor-pointer flex items-center gap-2"
      >
        Published Posts
        <BookOpenCheck />
      </TabsTrigger>

      <TabsTrigger value="like" class="cursor-pointer flex items-center gap-2">
        Liked Posts
        <Heart />
      </TabsTrigger>

      <TabsTrigger
        value="bookmark"
        class="cursor-pointer flex items-center gap-2"
      >
        Bookmarked Posts
        <Bookmark />
      </TabsTrigger>
    </TabsList>

    <section class="min-h-60 py-4">
      <TabsContent value="publish">
        <slot name="published-posts" />
      </TabsContent>

      <TabsContent value="like">
        <slot name="liked-posts" />
      </TabsContent>

      <TabsContent value="bookmark">
        <slot name="bookmarked-posts" />
      </TabsContent>
    </section>
  </Tabs>
</template>

<script setup lang="ts">
import { Bookmark, BookOpenCheck, Heart } from "lucide-vue-next";
</script>

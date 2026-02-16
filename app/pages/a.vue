<template>
  <div>

  </div>
</template>

<script setup lang="ts">
const postStore = usePostStore()

await postStore.fetchPostByOffset({})

watchEffect(() => {
  console.log(postStore.posts, 'postStore.post');

})
</script>

import type { ApiResponse, PostQuery } from "~/types/api.types";

export const usePostStore = defineStore("post", {
  state: () => ({
    data: {} as ApiResponse,
    loading: false,
    error: "",
    posts: [] as any,
  }),

  actions: {
    async createPost(title: string, content: string) {
      this.loading = true;
      this.error = "";

      try {
        const res = await $fetch("/api/posts", {
          method: "POST",
          body: { title, content },
        });

        // console.log(res, "res");
        this.data = res;
      } catch (error: any) {
        this.error = error.data.message || "Failed to create post";
      } finally {
        this.loading = false;
      }
    },

    async fetchPostByOffset(query: PostQuery) {
      this.loading = true;
      this.error = "";

      try {
        const { data } = await useFetch<ApiResponse>(`/api/posts`, {
          query: {
            ...(query.page && { page: query.page }),
            ...(query.limit && { limit: query.limit }),
            ...(query.order && { order: query.order }),
            ...(query.search && { search: query.search }),
            ...(query.tags && { tags: query.tags }),
          },
        });

        this.data = data.value!;
        this.posts = data.value?.data;
      } catch (error: any) {
        this.error = error.data.message || "Failed to fetch posts";
      } finally {
        this.loading = false;
      }
    },
  },
});

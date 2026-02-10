import type { ApiResponse, PostQuery } from "~/types/api.types";

export const usePostStore = defineStore("post", {
  state: () => ({
    data: {} as ApiResponse,
    loading: false,
    error: "",
    posts: [] as any,
    post: {} as Record<string, any>,
    total: 0,
    page: 1,
    limit: 0,
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

    async fetchAllPosts() {
      this.loading = true;
      this.error = "";

      try {
        const { data } = await useFetch<ApiResponse>(`/api/posts`);

        this.data = data.value!;
        this.posts = data.value?.data;
      } catch (error: any) {
        this.error = error.data.message || "Failed to fetch posts";
      } finally {
        this.loading = false;
      }
    },

    async fetchPostByOffset(query: PostQuery) {
      this.loading = true;
      this.error = "";

      try {
        const res = await $fetch<ApiResponse>(`/api/posts`, {
          query: {
            page: query.page ?? 1,
            limit: query.limit ?? 10,
            order: query.order,
            search: query.search,
            tags: query.tags,
          },
        });

        this.posts = res.data;

        // pagination
      } catch (error: any) {
        this.error = error.data.message || "Failed to fetch posts";
      } finally {
        this.loading = false;
      }
    },

    async fetchPostById(id: string) {
      this.loading = true;
      this.error = "";

      try {
        const res = await $fetch<ApiResponse>(`/api/posts/${id}`);

        // console.log(res, "data");

        this.post = res.data as Record<string, any>;
      } catch (error: any) {
        this.error = error.data.message || "Failed to fetch post";
      } finally {
        this.loading = false;
      }
    },

    async fetchMyPost() {},
  },
});

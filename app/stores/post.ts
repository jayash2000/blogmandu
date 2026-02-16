import type {
  ApiResponse,
  CursorPaginatedPosts,
  PaginatedPosts,
  Post,
  PostQuery,
} from "~/types/api.types";

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [] as Post[],
    post: null as Post | null,

    total: 0,
    page: 1,
    count: 0,
    limit: 10,

    nextCursor: null as { id: string; createdAt: Date } | null,
    hasNextPage: true,

    loading: false,
    error: "" as string | null,

    response: null as ApiResponse | null,
  }),

  actions: {
    setLoading(value: boolean) {
      this.loading = value;
    },

    setError(error: unknown) {
      this.error =
        (error as any)?.data?.message ||
        (error as Error)?.message ||
        "Something went wrong";
    },

    setResponse(data: { success: boolean; message: string }) {
      this.response = data;
    },

    async createPost(title: string, content: string) {
      this.setLoading(true);
      this.error = null;

      try {
        const res = await $fetch<ApiResponse>("/api/posts", {
          method: "POST",
          body: { title, content },
        });

        this.setResponse(res);
      } catch (error) {
        this.setError(error);
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    async fetchPostByOffset(query: PostQuery, append = false) {
      this.setLoading(true);
      this.error = null;

      try {
        const res = await $fetch<PaginatedPosts>(`/api/posts`, {
          query: {
            page: query?.page ?? this.page,
            limit: query?.limit ?? this.limit,
            order: query?.order,
            search: query?.search,
            tags: query?.tags,
          },
        });

        this.posts = res.data;
        this.total = res.total;
        this.page = res.page;
        this.limit = res.limit;
        this.count = res.count;
      } catch (error) {
        this.setError(error);
      } finally {
        this.setLoading(false);
      }
    },

    async loadMore(query: PostQuery, append = false) {
      this.setLoading(true);
      this.error = null;

      try {
        const res = await $fetch<CursorPaginatedPosts>("/api/posts", {
          query: {
            page: query?.page ?? this.page,
            limit: query?.limit ?? this.limit,
            order: query?.order ?? "desc",
            search: query?.search,
            tags: query?.tags,
            id: append ? (query.cursor?.id ?? this.nextCursor?.id) : undefined,
            createdAt: append
              ? (query.cursor?.createdAt ?? this.nextCursor?.createdAt)
              : undefined,
            // id: query.cursor?.id ?? this.nextCursor?.id,
            // createdAt: query.cursor?.createdAt ?? this.nextCursor?.createdAt,
          },
        });

        console.log(res, "res");

        if (append) {
          this.posts.push(...res.data);
          console.log(this.posts, "posts");
        } else {
          this.posts = res.data;
        }

        this.limit = res.limit;
        this.count = res.currentPostCount;
        this.nextCursor = res.nextCursor;
        this.hasNextPage = res.hasNextPage;
      } catch (error) {
        this.setError(error);
      } finally {
        this.setLoading(false);
      }
    },

    async fetchPostById(id: string) {
      this.setLoading(true);
      this.error = null;

      try {
        const post = await $fetch<{
          success: boolean;
          message: string;
          data: Post;
        }>(`/api/posts/${id}`);
        this.post = post.data;
      } catch (error) {
        this.setError(error);
      } finally {
        this.setLoading(false);
      }
    },
  },
});

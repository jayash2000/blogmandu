import type {
  ApiResponse,
  CursorPaginatedPosts,
  MyPaginatedPosts,
  MyPosts,
  PaginatedPosts,
  Post,
  PostQuery,
  PostWithAuthor,
} from "~/types/api.types";

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [] as Post[] | PostWithAuthor[],
    post: null as Post | null,

    authorEmail: "" as string,

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

    setHasNextPage(value: boolean) {
      this.hasNextPage = value;
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

    async fetchPostByOffset(
      query: PostQuery & { mine?: boolean },
      append = false,
    ) {
      this.setLoading(true);
      this.error = null;

      try {
        const res = await $fetch<PaginatedPosts | MyPaginatedPosts>(
          query.mine ? `/api/users/me/posts` : `/api/posts`,
          {
            query: {
              page: query?.page ?? this.page,
              limit: query?.limit ?? this.limit,
              order: query?.order,
              search: query?.search,
              tags: query?.tags,
            },
          },
        );

        console.log(res.data, "res");

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
          (this.posts as PostWithAuthor[]).push(...res.data);
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

    async fetchMyPost() {
      this.setLoading(true);
      this.error = null;

      try {
        const res = await $fetch<MyPosts>(`/api/users/me/posts`);

        this.authorEmail = res.data.author;
        this.count = res.data.count;
        this.posts = res.data.posts as Post[];
      } catch (error) {}
    },
  },
});

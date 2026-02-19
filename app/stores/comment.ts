import type { ApiResponse } from "~/types/api.types";
import type {
  CommentNode,
  CommentQuery,
  CommentResponse,
} from "~/types/comment.type";

export const useCommentStore = defineStore("comment", {
  state: () => ({
    loading: false,
    error: null as string | null,

    response: null as ApiResponse | null,
    comments: [] as CommentNode[],
    hasNextPage: false,
    nextCursor: null as { id: string; createdAt: Date } | null,
    total: 0,
    deletedComment: null as CommentNode | null,
  }),

  actions: {
    setLoading(value: boolean) {
      this.loading = value;
    },

    setError(error: unknown) {
      this.error =
        (error as any)?.data.message ||
        (error as Error)?.message ||
        "Something went wrong";
    },

    setResponse(res: ApiResponse) {
      this.response = res;
    },

    async createComment(postId: string, content: string) {
      this.setLoading(true);
      this.error = null;

      try {
        const res = await $fetch(`/api/posts/${postId}/comments`, {
          method: "POST",
          body: { content },
        });

        this.setResponse(res);
      } catch (error) {
        this.setError(error);
      } finally {
        this.setLoading(false);
      }
    },

    async replyComment(postId: string, commentId: string, content: string) {
      this.setLoading(true);
      this.error = null;

      try {
        const res = await $fetch(
          `/api/posts/${postId}/comments/${commentId}/reply`,
          {
            method: "POST",
            body: { content },
          },
        );

        this.setResponse(res);
      } catch (error) {
        this.setError(error);
      } finally {
        this.setLoading(false);
      }
    },

    async fetchComments(postId: string, append = false, query?: CommentQuery) {
      this.setLoading(true);
      this.error = null;

      try {
        const res = await $fetch<CommentResponse>(
          `/api/posts/${postId}/comments`,
          {
            query: {
              limit: query?.limit ?? 10,
              sort: query?.sort ?? "createdAt",
              order: query?.order ?? "desc",
              createdAt: append
                ? (query?.cursor.createdAt ?? this.nextCursor?.createdAt)
                : undefined,
              id: append
                ? (query?.cursor.id ?? this.nextCursor?.id)
                : undefined,
            },
          },
        );

        if (append) {
          this.comments.push(...res.data);
        } else {
          this.comments = res.data;
        }

        this.hasNextPage = res.hasNextPage;
        this.nextCursor = res.nextCursor;
        this.total = res.total;
      } catch (error) {
        this.setError(error);
      } finally {
        this.setLoading(false);
      }
    },

    async loadMore(postId: string) {
      if (!this.hasNextPage || !this.nextCursor) return;
      await this.fetchComments(postId, true);
    },

    async refresh(postId: string) {
      await this.fetchComments(postId);
    },

    async deleteComment(postId: string, commentId: string) {
      this.setLoading(true);
      this.error = null;

      try {
        const res = await $fetch(`/api/posts/${postId}/comments/${commentId}`, {
          method: "DELETE",
        });

        this.setResponse({ success: res.success, message: res.message });
        this.deletedComment = res.deletedComment;
      } catch (error) {
        this.setError(error);
      } finally {
        this.setLoading(false);
      }
    },
  },
});

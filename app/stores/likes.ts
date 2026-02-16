import type { Like } from "~/types/api.types";

export const useLikeStore = defineStore("likes", {
  state: () => ({
    likers: null as Like[] | null,
    likeCount: 0,

    message: "",
    isLiked: false,

    loading: false,
    error: "",
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

    init() {
      this.setLoading(true);
      this.error = "";
    },

    async toggleLike(postId: string) {
      this.init();

      try {
        const likedPost = await $fetch(`/api/posts/${postId}/likes`, {
          method: "PUT",
        });
        this.message = likedPost.message;
      } catch (error) {
        this.setError(error);
      } finally {
        this.setLoading(false);
      }
    },

    async checkLikeStatus(postId: string) {
      this.init();

      try {
        const res = await $fetch(`/api/posts/${postId}/like-status`);

        this.isLiked = res.isLiked;
      } catch (error) {
        this.setError(error);
      } finally {
        this.setLoading(false);
      }
    },

    async fetchLikesByPost(postId: string) {
      this.init();

      try {
        const res = await $fetch(`/api/posts/${postId}/likes`);

        this.likers = res.data.liked_by;
        this.likeCount = res.data.count;
      } catch (error) {
        this.setError(error);
      } finally {
        this.setLoading(false);
      }
    },

    
  },
});

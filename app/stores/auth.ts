import type { ApiResponse, User } from "~/types/api.types";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    data: {} as ApiResponse,
    loading: false,
    error: "",
    user: null as Record<string, string> | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async register(
      name: string,
      email: string,
      password: string,
      confirmPassword: string,
    ) {
      this.loading = true;
      this.error = "";

      try {
        const res = await $fetch("/api/auth/register", {
          method: "POST",
          body: { name, email, password, confirmPassword },
        });

        this.data = res;
      } catch (error: any) {
        this.error = error.data.message || "Failed to register";
      } finally {
        this.loading = false;
      }
    },

    async login(email: string, password: string) {
      this.loading = true;
      this.error = "";

      try {
        const res = await $fetch("/api/auth/login", {
          method: "POST",
          body: { email, password },
        });

        this.data = res;
      } catch (error: any) {
        this.error = error.data.message || "Failed to login";
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.loading = true;
      this.error = "";

      try {
        const res = await $fetch("/api/auth/logout", {
          method: "POST",
        });

        this.data = res;
        this.user = null;
      } catch (error: any) {
        this.error = error.data.message || "Failed to logout";
      } finally {
        this.loading = false;
      }
    },

    async fetchMe() {
      this.loading = true;
      this.error = "";
      const config = useRuntimeConfig();
      const headers = useRequestHeaders(["cookie"]) as Record<string, string>;

      try {
        const res = await $fetch(`/api/auth/me`, {
          method: "GET",
          baseURL: config.public.apiBase,
          headers,
        });

        this.data = res;
        if (res.data) {
          this.user = res.data as Record<string, string>;
        }
      } catch (error: any) {
        this.error = error.data?.message || "Failed to fetch user";
      } finally {
        this.loading = false;
      }
    },
  },
});

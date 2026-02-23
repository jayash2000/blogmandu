import type { ApiResponse, User } from "~/types/api.types";
import type { AuthUser } from "~/types/auth.types";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    data: {} as ApiResponse,
    loading: false,
    error: null as string | null,
    user: null as Record<string, string> | null,
    authUser: null as AuthUser | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.authUser,
  },

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
        this.authUser = null;
      } catch (error: any) {
        this.error = error.data.message || "Failed to logout";
      } finally {
        this.loading = false;
      }
    },

    async fetchMe() {
      this.setLoading(true);
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
        this.authUser = res.data as AuthUser;
      } catch (error) {
        this.setError(error);
      } finally {
        this.setLoading(false);
      }
    },

    async fetchUser(email: string) {
      this.setLoading(true);
      this.error = null;

      try {
        const res = await $fetch(`/api/users/${email}`);
        this.user = res.data.user;
      } catch (error) {
        this.setError(error);
      } finally {
        this.setLoading(false);
      }
    },
  },
});

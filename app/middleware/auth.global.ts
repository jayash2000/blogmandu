import { useAuthStore } from "../stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const publicAuthPages = ["/login", "/register", "/admin/login"];
  const publicPages =
    ["/", "/recent-posts"].includes(to.path) ||
    to.path.startsWith("/post") ||
    to.path.startsWith("/profile");
  const isAdminRoute =
    to.path.startsWith("/admin") && to.path !== "/admin/login";

  const auth = useAuthStore();

  if (!auth.user) {
    await auth.fetchMe();
  }

  // console.log({ user: auth.user });

  // Authenticated users should NOT see login/register
  if (auth.isAuthenticated && publicAuthPages.includes(to.path)) {
    return auth.user?.role === "admin"
      ? navigateTo("/admin/dashboard")
      : navigateTo("/");
  }

  // Admin trying to access user pages
  if (auth.isAuthenticated && auth.user?.role === "admin" && !isAdminRoute) {
    return navigateTo("/admin/dashboard");
  }

  // User trying to access admin pages
  if (auth.isAuthenticated && auth.user?.role === "user" && isAdminRoute) {
    return navigateTo("/");
  }

  // Unauthenticated user should NOT access private pages
  if (
    !auth.isAuthenticated &&
    !publicAuthPages.includes(to.path) &&
    !publicPages
  ) {
    return navigateTo("/");
  }
});

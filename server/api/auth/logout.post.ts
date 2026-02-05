export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user;
    if (!user) {
      return createApiResponse(event, 403, false, "Unauthorized");
    }

    setCookie(event, "auth_token", "", { path: "/", maxAge: 0 });
    // deleteCookie(event, "auth_token");

    return createApiResponse(event, 200, true, "Logged out successfully");
  } catch (error) {
    console.error("Server error:", error);
    return createApiResponse(event, 500, false, "Server error");
  }
});

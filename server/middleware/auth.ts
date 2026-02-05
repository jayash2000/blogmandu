import jwt from "jsonwebtoken";

export default defineEventHandler((event) => {
  const notAuthenticatedPaths = ["/auth/login", "/auth/register"];

  if (notAuthenticatedPaths.includes(event.path)) return;

  const token = getCookie(event, "auth_token");
  if (!token) return;

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!);
    event.context.user = data;
  } catch {
    event.context.user = null;
  }
});

import { eq } from "drizzle-orm";
import { db } from "~~/server/db/client";
import { users } from "~~/server/db/schema/users";

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user;

    // console.log(user, "user");

    if (!user) {
      return createApiResponse(event, 403, false, "Unauthorized");
    }

    const [findUser] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
      })
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    return { success: true, message: "Fetched user info", data: findUser };
  } catch (error) {
    console.error("Server error:", error);
    return createApiResponse(event, 500, false, "Server error");
  }
});

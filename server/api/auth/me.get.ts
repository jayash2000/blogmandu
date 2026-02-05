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
      .select()
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    const data = {
      id: findUser?.id,
      name: findUser?.name,
      email: findUser?.email,
      role: findUser?.role,
    };

    return createApiResponse(event, 200, true, "Fetched user info", data);
  } catch (error) {
    console.error("Server error:", error);
    return createApiResponse(event, 500, false, "Server error");
  }
});

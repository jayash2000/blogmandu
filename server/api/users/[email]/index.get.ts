import { eq } from "drizzle-orm";
import { db } from "~~/server/db/client";
import { users } from "~~/server/db/schema/users";
import { userRouteSchema } from "~~/shared/schema/route.schema";

export default defineEventHandler(async (event) => {
  // validation (user params)
  const params = await getValidatedRouterParams(event, (body) =>
    userRouteSchema.safeParse(body),
  );

  if (!params.success) {
    throw createError({
      statusCode: 400,
      message: params.error.issues[0]?.message as string,
    });
  }

  const [user] = await db
    .select({
      user: {
        id: users.id,
        name: users.name,
        email: users.email,
      },
    })
    .from(users)
    .where(eq(users.email, params.data.email))
    .limit(1);

  if (!user) {
    throw createError({
      statusCode: 404,
      message: "User not found",
    });
  }

  return {
    success: true,
    message: "User found",
    data: user,
  };
});

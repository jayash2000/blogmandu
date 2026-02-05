import { eq } from "drizzle-orm";
import { db } from "~~/server/db/client";
import { users } from "~~/server/db/schema/users";
import bcrypt from "bcrypt";
import { registerSchema } from "~~/server/schema/auth.schema";

export default defineEventHandler(async (event) => {
  try {
    const result = await readValidatedBody(event, (body) =>
      registerSchema.safeParse(body),
    );

    if (!result.success) {
      return createApiResponse(
        event,
        400,
        false,
        result.error.issues[0]?.message!,
      );
    }

    const { email, name, password, role } = result.data;

    const [findUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (findUser) {
      return createApiResponse(event, 400, false, "This user already exists");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await db.insert(users).values({
      name,
      email,
      passwordHash,
      role,
    });

    return createApiResponse(event, 200, true, "Registered successfully");
  } catch (error) {
    console.error("Server error:", error);
    return createApiResponse(event, 500, false, "Server error");
  }
});

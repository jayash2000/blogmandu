import { eq } from "drizzle-orm";
import { db } from "~~/server/db/client";
import { users } from "~~/server/db/schema/users";
import { createApiResponse } from "~~/server/utils/api";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema } from "~~/server/schema/auth.schema";

export default defineEventHandler(async (event) => {
  try {
    const result = await readValidatedBody(event, (body) =>
      loginSchema.safeParse(body),
    );

    if (!result.success) {
      return createApiResponse(
        event,
        400,
        false,
        result.error.issues[0]?.message!,
      );
    }

    const { email, password } = result.data;

    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return createApiResponse(event, 400, false, `${email} doesn't exist`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return createApiResponse(event, 400, false, "Invalid password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      },
    );

    setCookie(event, "auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return createApiResponse(event, 200, true, "Logged in successfully");
  } catch (error) {
    console.error("Server error:", error);
    return createApiResponse(event, 500, false, "Server error");
  }
});

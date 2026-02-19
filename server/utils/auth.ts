import { H3Event } from "h3";

export const authorize = async (event: H3Event) => {
  const user = event.context.user;

  console.log(user, "user");

  if (!user) {
    throw createError({
      statusCode: 403,
      message: "Unauthorized",
    });
  }

  return user;
};

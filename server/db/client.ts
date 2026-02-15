import { drizzle } from "drizzle-orm/node-postgres";

const config = useRuntimeConfig();

export const db = drizzle(config.public.databaseUrl);

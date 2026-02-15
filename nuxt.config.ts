import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],
  modules: [
    "@pinia/nuxt",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    "@nuxtjs/mdc",
    "@nuxt/eslint",
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || "http://localhost:3000",
      databaseUrl: process.env.DATABASE_URL,
      jwtSecret: process.env.JWT_SECRET,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  shadcn: {
    prefix: "",
    componentDir: "@/components/ui",
  },
  colorMode: {
    classSuffix: "",
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
});

<template>
  <section
    class="w-full h-full bg-background flex flex-col gap-12 justify-center items-center"
  >
    <h1 class="font-bold text-4xl dark:text-blue-200">
      <span class="text-primary">blog</span>mandu
    </h1>

    <form
      @submit.prevent="handleSubmit"
      class="max-w-md w-full bg-card p-8 rounded-md border shadow-md shadow-card"
    >
      <FieldSet>
        <FieldGroup>
          <FieldTitle class="flex flex-col gap-2 items-start">
            <h1 class="text-3xl font-semibold">
              Welcome <span class="text-primary">User</span>
            </h1>

            <FieldDescription>
              Enter your email and password to sign in to your account
            </FieldDescription>
          </FieldTitle>

          <Field>
            <FieldLabel for="email"> Email </FieldLabel>
            <Input
              type="text"
              id="email"
              placeholder="abc@example.com"
              v-model="form.email"
              class="focus:ring-1!"
            />
          </Field>

          <Field>
            <FieldLabel for="password"> Password </FieldLabel>
            <Input
              type="password"
              id="password"
              placeholder="*******"
              v-model="form.password"
              class="focus:ring-1!"
            />
          </Field>

          <Button
            class="hover:opacity-90 cursor-pointer"
            :disabled="auth.loading"
          >
            {{ auth.loading ? "Submitting..." : "Sign Up" }}
          </Button>

          <article class="text-sm flex items-center justify-center gap-2">
            <p>Don't have an account?</p>

            <NuxtLink
              to="/register"
              class="text-primary hover:underline hover:underline-offset-2"
            >
              Register
            </NuxtLink>
          </article>
        </FieldGroup>
      </FieldSet>
    </form>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from "#imports";
import { toast } from "vue-sonner";
import { Button } from "~/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
const form = reactive({
  email: "",
  password: "",
});

const auth = useAuthStore();

const handleSubmit = async () => {
  if (form.email.split("@")[1]?.startsWith("admin")) {
    toast.error("You cannot access admin account from this page", {
      class:
        "bg-destructive text-white p-4 rounded-sm w-fit flex items-center absolute bottom-4 right-4 gap-2 text-sm",
      duration: 2000,
    });
    return;
  }

  await auth.login(form.email, form.password);

  if (auth.error) {
    toast.error(auth.error, {
      class:
        "bg-destructive text-white p-4 rounded-sm w-fit flex items-center absolute bottom-4 right-4 gap-2 text-sm",
      duration: 2000,
    });
    return;
  }

  toast.success(auth.data.message, {
    class:
      "bg-green-500 text-white p-4 rounded-sm w-fit flex items-center absolute bottom-4 right-4 gap-2 text-sm z-50",
    duration: 2000,
  });

  form.email = "";
  form.password = "";

  setTimeout(() => {
    return navigateTo("/");
  }, 500);
};

useHead({
  title: "Login",
});
</script>

<style scoped></style>

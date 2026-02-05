<template>
  <section
    class="w-full h-full bg-background flex flex-col gap-8 justify-center items-center"
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
            <h1 class="text-3xl font-semibold">Create an account</h1>

            <FieldDescription>
              Enter your email and password to sign in to your account
            </FieldDescription>
          </FieldTitle>

          <Field>
            <FieldLabel for="email"> Full Name </FieldLabel>
            <Input
              type="text"
              id="name"
              placeholder="Random User"
              v-model="form.name"
              class="focus:ring-1!"
            />
          </Field>

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

          <Field>
            <FieldLabel for="confirm-password"> Confirm Password </FieldLabel>
            <Input
              type="password"
              id="confirm-password"
              placeholder="*******"
              v-model="form.confirmPassword"
              class="focus:ring-1!"
            />
          </Field>

          <Button class="hover:opacity-90 cursor-pointer">
            {{ auth.loading ? "Please wait..." : "Register" }}
          </Button>

          <article class="text-sm flex items-center justify-center gap-2">
            <p>Already have an account?</p>

            <NuxtLink
              to="/login"
              class="text-primary hover:underline hover:underline-offset-2"
            >
              Login
            </NuxtLink>
          </article>
        </FieldGroup>
      </FieldSet>
    </form>
  </section>
</template>

<script setup lang="ts">
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
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const auth = useAuthStore();

const handleSubmit = async () => {
  await auth.register(
    form.name,
    form.email,
    form.password,
    form.confirmPassword,
  );

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

  form.name = "";
  form.email = "";
  form.password = "";
  form.confirmPassword = "";

  setTimeout(() => {
    return navigateTo("/login");
  }, 500);
};

useHead({
  title: "Register",
});
</script>

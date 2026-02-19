<template>
  <nav
    class="bg-background w-full z-50 flex flex-col gap-4 lg:gap-0 lg:flex-row items-center justify-between px-6 py-4 border-b-2 border-border dark:border-none"
    :class="{
      'border-none': auth.user?.role === 'admin',
      'justify-end':
        route.path.startsWith('/u/dashboard') ||
        ['/admin/dashboard'].includes(route.path),
    }"
  >
    <NuxtLink to="/">
      <h1
        class="font-bold text-3xl dark:text-blue-200"
        v-if="
          !['/admin/dashboard'].includes(route.path) &&
          !route.path.startsWith('/u/dashboard')
        "
      >
        <span class="text-primary">blog</span>mandu
      </h1>
    </NuxtLink>

    <NavigationMenu
      v-if="
        auth.user?.role !== 'admin' && !route.path.startsWith('/u/dashboard')
      "
    >
      <NavigationMenuList class="space-x-8">
        <NavigationMenuItem
          v-for="item in NAVLINKS"
          :key="item.id"
          :class="{
            'dark:text-primary text-blue-600 font-semibold':
              route.path === item.link,
          }"
        >
          <NuxtLink :to="item.link">
            {{ item.label }}
          </NuxtLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    <NuxtLink to="/u/post/create" class="flex lg:hidden">
      <Button v-if="auth.user?.role === 'user' && !route.path.startsWith('/u')">
        <span> Create Post </span>
        <Plus class="text-xs mb-0.5" />
      </Button>
    </NuxtLink>

    <section class="flex gap-4 items-center">
      <Button
        v-if="auth.user?.role === 'user' && !route.path.startsWith('/u')"
        class="lg:flex hidden"
        @click="() => navigateTo('/u/post/create')"
      >
        <span> Create Post </span>
        <Plus class="text-xs mb-0.5" />
      </Button>

      <Input
        type="text"
        placeholder="Search posts..."
        class="focus-ring-1!"
        v-if="auth.user?.role === 'user' && !route.path.startsWith('/u')"
      />

      <ModeToggle
        v-if="route.path !== '/login' && route.path !== '/register'"
      />

      <Button
        v-if="!auth.isAuthenticated"
        class="cursor-pointer dark:hover:opacity-75 hover:bg-blue-600"
        @click="() => navigateTo('/login')"
      >
        Login
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Avatar
            v-if="auth.isAuthenticated"
            class="cursor-pointer hover:brightness-75 bg-foreground flex justify-center items-center"
          >
            <AvatarImage v-if="auth.user?.image" src="" />
            <span v-if="!auth.user?.image" class="text-background font-medium">
              {{ auth.user?.name?.[0] }}
            </span>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent class="w-40 mt-2" align="end">
          <DropdownMenuLabel>
            Welcome
            <span class="font-medium dark:text-blue-400 text-blue-600">
              {{ auth.user?.name?.split(" ")[0] }}
            </span>
          </DropdownMenuLabel>

          <Separator class="my-1" />

          <DropdownMenuGroup>
            <DropdownMenuItem
              @click="() => navigateTo(`/profile/${auth.user?.id}`)"
            >
              My Account
            </DropdownMenuItem>

            <DropdownMenuItem
              @click="
                () =>
                  navigateTo('/u/dashboard', {
                    external: true,
                    open: {
                      target: '_blank',
                    },
                  })
              "
            >
              Author Console
            </DropdownMenuItem>

            <DropdownMenuItem @click="handleLogout">Logout</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  </nav>
</template>

<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { toast } from "vue-sonner";
import ModeToggle from "~/components/ModeToggle.vue";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { Separator } from "~/components/ui/separator";

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const handleLogout = async () => {
  await auth.logout();

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
      "bg-green-500 text-white p-4 rounded-sm w-fit flex items-center absolute bottom-4 right-4 gap-2 text-sm",
    duration: 2000,
  });

  router.replace("/login");
};
</script>

<style scoped></style>

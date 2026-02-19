import { toast } from "vue-sonner";

export const showToast = (
  status: "success" | "error" | "info",
  message: string,
) => {
  if (status === "success") {
    toast.success(message, {
      class:
        "bg-primary text-white p-4 rounded-sm w-fit flex items-center gap-2 text-sm",
      duration: 1000,
    });
  }

  if (status === "error") {
    toast.error(message, {
      class:
        "bg-destructive text-white p-4 rounded-sm w-fit flex items-center gap-2 text-sm",
      duration: 1000,
    });
  }

  if (status === "info") {
    toast.info(message, {
      class:
        "bg-accent text-white p-4 rounded-sm w-fit flex items-center gap-2 text-sm",
      duration: 1000,
    });
  }
};

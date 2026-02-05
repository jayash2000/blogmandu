export interface ApiResponse {
  success: boolean;
  message: string;
  data?: Record<string, string | number> | Record<string, string | number>[];
}

export interface User {
  id: string;
  email: string;
  role: "user" | "admin";
}

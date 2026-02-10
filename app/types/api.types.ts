export interface ApiResponse {
  success: boolean;
  message: string;
  data?: Record<string, any> | Record<string, any>[];
}

export interface User {
  id: string;
  email: string;
  role: "user" | "admin";
}

export type PostQuery = {
  page?: number;
  limit?: number;
  order?: "asc" | "desc";
  search?: string;
  tags?: string | string[];
};

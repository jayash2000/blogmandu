export interface ApiResponse {
  success: boolean;
  message: string;
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
  cursor?: { id: string; createdAt?: Date };
};

export interface Post {
  author: {
    [key: string]: string;
  };

  post: {
    id: string;
    title: string;
    slug: string;
    contentMarkdown: string;
    contentHtml: string;
    imageUrl: string | null;
    tags: string[] | null;
    authorId: string;
    isPublished: boolean | null;
    description: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  };
}

export interface PaginatedPosts {
  data: Post[];
  total: number;
  page: number;
  limit: number;
  count: number;
}

export interface CursorPaginatedPosts {
  data: Post[];
  currentPostCount: number;
  limit: number;
  nextCursor: { id: string; createdAt: Date } | null;
  hasNextPage: boolean;
}

export interface Like {
  id: string;
  user: {
    name: string;
    email: string;
  };
}

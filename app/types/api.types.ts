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
  createdAt: Date | string;
  updatedAt: Date | null;
}

export interface PostWithAuthor {
  author: {
    id: string;
    name: string;
    email: string;
  };

  post: Post;
}

export interface PaginatedMeta {
  total: number;
  page: number;
  limit: number;
  count: number;
  totalPages: number;
  author?: string;
  currentPostCount?: number;
}

export interface PaginatedPosts extends PaginatedMeta {
  data: PostWithAuthor[];
}

export interface MyPaginatedPosts extends PaginatedMeta {
  data: Post[];
}

export interface CursorPaginatedPosts {
  data: PostWithAuthor[];
  currentPostCount: number;
  limit: number;
  nextCursor: { id: string; createdAt: Date } | null;
  hasNextPage: boolean;
}

export interface MyPosts {
  data: {
    count: number;
    author: string;
    posts: Record<string, any>;
  };
}

export interface Like {
  id: string;
  user: {
    name: string;
    email: string;
  };
}

export interface LikedPosts {
  id: string;
  post: {
    id: string;
    title: string;
    slug: string;
  };
}

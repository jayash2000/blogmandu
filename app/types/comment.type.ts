export interface CommentNode {
  comments: {
    id: string;
    postId: string;
    userId: string;
    parentId: string | null;
    content: string;
    isDeleted: boolean;
    status: "visible" | "hidden" | "pending";
    depth: number;
    createdAt: Date | string;
    updatedAt: Date | string;
  };
  user: {
    id: string;
    name?: string;
    email?: string;
  } | null;
  children?: CommentNode[];
}

export interface CommentResponse {
  type: string;
  limit: number;
  currentCommentCount: number;
  total: number;
  hasNextPage: boolean;
  nextCursor: { id: string; createdAt: Date } | null;
  data: CommentNode[];
}

export interface CommentQuery {
  limit: number;
  sort: "createdAt";
  order: "asc" | "desc";
  cursor: {
    createdAt?: string;
    id?: string;
  };
}

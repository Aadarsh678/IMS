export interface PostComment {
  id: number;
  content: string;
  postId: number;
  authorId: number;
  createdAt: string;
  author?: any;
}

export interface CreateCommentRequest {
  content: string;
  postId: number;
}

export interface UpdateCommentRequest {
  content: string;
}

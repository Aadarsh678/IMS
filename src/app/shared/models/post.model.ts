import { PostComment } from "./comment.model"

export enum PostStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CLOSED = "CLOSED",
}

export interface Post {
  id: number
  title: string
  description: string
  createdBy: number
  assignedTo: number | null
  status: PostStatus
  createdAt: string
  creator?: any
  assignee?: any
  comments?: PostComment[]
  updates?: PostUpdate[]
}

export interface CreatePostRequest {
  title: string
  description: string
}

export interface ChangePostStatusRequest {
  id: number
}

export interface PostUpdate {
  id: number
  postId: number
  content: string
  createdAt: string
}

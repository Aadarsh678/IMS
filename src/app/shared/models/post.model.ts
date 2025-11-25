import { PostComment } from "./comment.model"

export enum PostStatus {
  DRAFT = "DRAFT",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CLOSED = "CLOSED",
}

export enum PostType {
    ISSUE = "ISSUE",
    COMPLAINT = "COMPLAINT",
    POST = "POST",
    ANNOUNCEMENT = "ANNOUNCEMENT"
}

export interface Post {
  id: number
  title: string
  description: string
  createdBy: number
  assignedTo: number | null
  postType: PostType
  status: PostStatus
  createdAt: string
  creator?: any
  assignee?: any
  comments?: PostComment[]
  updates?: PostUpdateRequest[]
}

export interface CreatePostRequest {
  postType: PostType
  title: string
  description: string
}

export interface ChangePostStatusRequest {
  id: number
}

export interface PostUpdateRequest {
  title: string
  description: string
  postType: PostType
}

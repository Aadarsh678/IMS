import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { PostComment, CreateCommentRequest, UpdateCommentRequest } from "../../shared/models"

@Injectable({
  providedIn: "root",
})
export class CommentService {
  private apiUrl = "https://localhost:7251/api/comment"

  constructor(private http: HttpClient) {}

  addComment(request: CreateCommentRequest): Observable<PostComment> {
    return this.http.post<PostComment>(this.apiUrl, request)
  }

  getCommentsByPost(postId: number): Observable<PostComment[]> {
    return this.http.get<PostComment[]>(`${this.apiUrl}/post/${postId}`)
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  updateComment(id: number, request: UpdateCommentRequest): Observable<PostComment> {
    return this.http.put<PostComment>(`${this.apiUrl}/${id}`, request)
  }
}

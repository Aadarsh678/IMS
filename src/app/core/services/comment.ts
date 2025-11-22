import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { PostComment, CreateCommentRequest } from "../../shared/models"

@Injectable({
  providedIn: "root",
})
export class CommentService {
  private apiUrl = "https://localhost:7015/api/comment"

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
}

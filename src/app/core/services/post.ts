import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"
import type { Post, CreatePostRequest, ChangePostStatusRequest } from "../../shared/models"

@Injectable({
  providedIn: "root",
})
export class PostService {
  private apiUrl = "https://localhost:7015/api/post"

  constructor(private http: HttpClient) {}

  createPost(request: CreatePostRequest): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, request)
  }

  submitPost(request: ChangePostStatusRequest): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/submit`, request)
  }

  closePost(request: ChangePostStatusRequest): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/close`, request)
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  // to see all approved post of all user
  getAllApprovedPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/approved`)
  }

  //to see loged in user all post regardless of status
  getUserPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/user`)
  }
}

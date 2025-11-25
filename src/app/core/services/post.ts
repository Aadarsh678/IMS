import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"
import type { Post, CreatePostRequest, ChangePostStatusRequest, PostStatus,PostUpdateRequest } from "../../shared/models"

@Injectable({
  providedIn: "root",
})
export class PostService {
  private apiUrl = "https://localhost:7251/api/post";

  constructor(private http: HttpClient) {}

  createPost(request: CreatePostRequest): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, request);
  }

  // Use PUT for submitPost because it corresponds to the PUT route in the backend
  submitPost(request: ChangePostStatusRequest): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/submit`, request);  // Change from post to put
  }

  // Use PUT for closePost because it corresponds to the PUT route in the backend
  closePost(request: ChangePostStatusRequest): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/close`, request);  // Change from post to put
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // to see all approved posts of all users
  getAllApprovedPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/approved`);
  }

  // to see logged-in user's posts regardless of status
  getUserPosts(status?: PostStatus): Observable<Post[]> {
    const params: Record<string, string> = status ? { postStatus: status } : {};
    return this.http.get<Post[]>(`${this.apiUrl}/user`, { params });
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  updatePost(id: number, request: PostUpdateRequest): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/update-post/${id}`, request); 
  }
}

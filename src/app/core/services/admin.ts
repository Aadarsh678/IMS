import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { Post, User, ChangePostStatusRequest } from "../../shared/models"

@Injectable({
  providedIn: "root",
})
export class AdminService {
  private apiUrl = "https://localhost:5000/api/admin"

  constructor(private http: HttpClient) {}

  promoteUser(userId: number): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/user/promote`, { id: userId })
  }

  approvePost(request: ChangePostStatusRequest): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/post/approve`, request)
  }

  rejectPost(request: ChangePostStatusRequest): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/post/reject`, request)
  }

  getAllSubmittedPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/post/submitted/all`)
  }

  getSubmittedPostsByUser(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/post/submitted/user/${userId}`)
  }
}

import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, type Observable } from "rxjs"
import { tap } from "rxjs/operators"
import { type User, type AuthResponse, UserRole } from "../../shared/models"



@Injectable({
  providedIn: "root",
})
export class Auth {
  private apiUrl = "https://localhost:7015/api/auth"
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  public currentUser$ = this.currentUserSubject.asObservable()

  constructor(private http: HttpClient) {
    this.loadStoredUser()
  }

  private loadStoredUser(): void {
    const stored = localStorage.getItem("currentUser")
    if (stored) {
      this.currentUserSubject.next(JSON.parse(stored))
    }
  }

  private storeCredentials(email: string, password: string): void {
    const credentials = btoa(`${email}:${password}`)
    localStorage.setItem("basicAuth", credentials)
    localStorage.setItem("userEmail", email)
  }

  private clearCredentials(): void {
    localStorage.removeItem("basicAuth")
    localStorage.removeItem("userEmail")
  }

  register(username: string, email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, {
        username,
        email,
        password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem("userId", response.id.toString())
          localStorage.setItem("currentUser", JSON.stringify(response))
          this.storeCredentials(email, password)
          this.currentUserSubject.next(response as User)
        }),
      )
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem("userId", response.id.toString())
          localStorage.setItem("currentUser", JSON.stringify(response))
          this.storeCredentials(email, password)
          this.currentUserSubject.next(response as User)
        }),
      )
  }

  logout(): void {
    localStorage.removeItem("userId")
    localStorage.removeItem("currentUser")
    this.clearCredentials()
    this.currentUserSubject.next(null)
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value
    return user?.role === UserRole.ADMIN || user?.role === UserRole.SUPERADMIN
  }

  isSuperAdmin(): boolean {
    const user = this.currentUserSubject.value
    return user?.role === UserRole.SUPERADMIN
  }
}
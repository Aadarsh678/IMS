import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User, AuthResponse, UserRole } from "../../shared/models";

@Injectable({
  providedIn: "root",
})
export class Auth {
  private apiUrl = "https://localhost:7251/api/auth";
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadStoredUser();
  }

  /** Load user from localStorage on init */
  private loadStoredUser(): void {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      const user = JSON.parse(stored) as User;
      this.currentUserSubject.next(user);
    }
  }

  /** Store basic auth credentials */
  private storeCredentials(email: string, password: string): void {
    const credentials = btoa(`${email}:${password}`);
    localStorage.setItem("basicAuth", credentials);
    localStorage.setItem("userEmail", email);
  }

  /** Clear stored credentials */
  private clearCredentials(): void {
    localStorage.removeItem("basicAuth");
    localStorage.removeItem("userEmail");
  }

  /** Register new user */
  register(username: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { username, email, password })
      .pipe(
        tap(response => this.setUserAfterAuth(response, email, password))
      );
  }

  /** Login user */
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => this.setUserAfterAuth(response, email, password))
      );
  }

  /** Logout user */
  logout(): void {
    localStorage.removeItem("userId");
    localStorage.removeItem("currentUser");
    this.clearCredentials();
    this.currentUserSubject.next(null);
  }

  /** Set user after login/register */
  private setUserAfterAuth(user: AuthResponse, email: string, password: string): void {
    localStorage.setItem("userId", user.id.toString());
    localStorage.setItem("currentUser", JSON.stringify(user));
    this.storeCredentials(email, password);
    this.currentUserSubject.next(user as User);
  }

  /** Get current user */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getCurrentUserId(): number | null {
    return this.currentUserSubject.value?.id || null;
  }

  /** Check if user is authenticated */
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  /** Check if user is admin */
  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === UserRole.ADMIN || user?.role === UserRole.SUPERADMIN;
  }


  /** Check if user is superadmin */
  isSuperAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === UserRole.SUPERADMIN;
  }
}

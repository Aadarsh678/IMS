// src/app/core/interceptors/token.interceptor.ts
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Auth } from "../services/auth";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get Basic Auth from localStorage
    const basicAuth = localStorage.getItem("basicAuth");

    // Skip adding Authorization header for login/register requests
    const isAuthRequest = request.url.includes('/auth/login') || request.url.includes('/auth/register');

    if (basicAuth && !isAuthRequest) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${basicAuth}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        }
        return throwError(() => error);
      })
    );
  }
}

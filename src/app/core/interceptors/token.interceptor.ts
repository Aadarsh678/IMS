import { Injectable } from "@angular/core"
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from "@angular/common/http"
import { Observable, throwError } from "rxjs"
import { catchError } from "rxjs/operators"
import { Auth } from "../services/auth"
import { Router } from "@angular/router"

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: Auth,
    private router: Router,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const basicAuth = localStorage.getItem("basicAuth")

    if (basicAuth) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${basicAuth}`,
        },
      })
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout()
          this.router.navigate(["/auth/login"])
        }
        return throwError(() => error)
      }),
    )
  }
}

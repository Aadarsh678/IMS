import { Router, type CanActivateFn } from "@angular/router"
import { Auth } from "../services"
import { inject } from "@angular/core"

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth)
  const router = inject(Router)

  if (authService.isAdmin()) {
    return true
  }

  router.navigate(["/"])
  return false
}

import { Router, type CanActivateFn } from "@angular/router"
import { Auth } from "../services"
import { inject } from "@angular/core"

export const superAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth)
  const router = inject(Router)

  if (authService.isSuperAdmin()) {
    return true
  }

  router.navigate(['/auth/login']);
  return false;
}

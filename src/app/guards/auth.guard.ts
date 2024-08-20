import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthTokenService } from '../servicios/auth/auth-token.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthTokenService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }
  else {
    router.navigate(['/unauthorized']);
    return false;
  }
}
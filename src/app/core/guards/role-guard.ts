import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthServices } from '../../services/auth-services';

export const roleGuard: CanActivateFn = (route, state) => {

  const authServices = inject(AuthServices);
  const router = inject(Router);

  const requiredRoles = route.data?.['roles'] as string[];

  const userRole = authServices.getRole();

  if (!userRole || !requiredRoles.includes(userRole)) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthServices } from '../services/auth-services';

export const adminGuard: CanActivateFn = () => {
  const authServices = inject(AuthServices);
  const router = inject(Router);
  const currentUser = authServices.getCurrentUser();

  if (!authServices.isLoggedIn() || !currentUser) {
    return router.createUrlTree(['/login']);
  }

  if (currentUser?.role !== 'admin') {
    return router.createUrlTree(['/editor']);
  }

  return true;
};

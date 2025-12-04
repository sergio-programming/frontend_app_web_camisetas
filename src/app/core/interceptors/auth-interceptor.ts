import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServices } from '../../services/auth-services';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authServices = inject(AuthServices);

  const token = authServices.getToken();

  if (token) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(authReq);
  }

  return next(req);
};

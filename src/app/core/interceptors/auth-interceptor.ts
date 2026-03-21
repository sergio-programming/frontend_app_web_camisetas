import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServices } from '../services/auth-services';
import { catchError, switchMap, from, throwError } from 'rxjs'; // Importamos 'from'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServices);
  const token = authService.getAccessToken();

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si falla con 401 y no es login...
      if (error.status === 401 && !req.url.includes('/login')) {
        
        // 'from' convierte tu Promesa async en un Observable que RxJS entiende
        return from(authService.refreshToken()).pipe(
          switchMap((res: any) => {
            // Extraemos el nuevo token de la respuesta
            const newToken = res.accessToken;
            
            // Actualizamos el Signal y LocalStorage
            authService.saveAccessToken(newToken);

            // Clonamos y reintentamos la petición original
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` }
            });
            return next(retryReq);
          }),
          catchError((refreshErr) => {
            // Si el refresh falla (ej. cookie expirada), limpiamos todo
            // Como logout() es async, aquí solo lo disparamos
            authService.logout();
            return throwError(() => refreshErr);
          })
        );
      }
      return throwError(() => error);
    })
  );
};

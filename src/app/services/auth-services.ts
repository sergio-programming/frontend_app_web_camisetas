import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginResponse {
  accessToken: string;
  user: {
    nombre: string;
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  
  private apiUrl = 'https://backend-app-web-camisetas.onrender.com/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: {email: string, password: string}): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap((response) => {
        localStorage.setItem('accessToken', response.accessToken);

        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user))
        }
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      })
    );
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  getRole() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  }
 
  
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

}

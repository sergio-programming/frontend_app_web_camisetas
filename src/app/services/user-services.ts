import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  _id: string;
  email: string;
  nombre: string;
  role: string;
  activo: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserResponse {
  message: string;
  user: User;
}

export interface UserCreate {
  email: string;
  nombre: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  
  private apiUrl = 'https://backend-app-web-camisetas.onrender.com/api/users';
  
  constructor (private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(_id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${_id}`);
  }

  createUser(user: UserCreate): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.apiUrl, user)
  }

  updateUser(_id: string, user: Partial<User>): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.apiUrl}/${_id}`, user);
  }

  deleteUser(_id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${_id}`);
  }

}

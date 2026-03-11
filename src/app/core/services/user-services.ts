import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserCreate, UserUpdate, UserResponse } from '../../features/users/user.model';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserServices {
  
  private apiUrl = 'https://backend-app-web-camisetas.onrender.com/api/users';

  private readonly http = inject(HttpClient);


  async getUsers(): Promise<User[]> {
    return await firstValueFrom(
      this.http.get<User[]>(`${this.apiUrl}`)
    );
  }

  async getUser(_id: string): Promise<User> {
    return await firstValueFrom(
      this.http.get<User>(`${this.apiUrl}/${_id}`)
    ); 
  }

  async createUser(user: UserCreate): Promise<UserResponse> {
    return await firstValueFrom(
      this.http.post<UserResponse>(this.apiUrl, user)
    ); 
  }

  async updateUser(_id: string, user: UserUpdate): Promise<UserResponse> {
    return await firstValueFrom(
      this.http.put<UserResponse>(`${this.apiUrl}/${_id}`, user)
    ); 
  }

  async deleteUser(_id: string): Promise<UserResponse> {
    return await firstValueFrom(
      this.http.delete<UserResponse>(`${this.apiUrl}/${_id}`)
    ); 
  }

}

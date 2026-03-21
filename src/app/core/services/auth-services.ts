import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionUser } from '../../features/users/user.model';
import { LoginPayload, LoginResponse, AuthSession } from '../../features/auth/auth.model';
import { firstValueFrom } from 'rxjs';
import { LocalStorageServices } from './local-storage-services';

const AUTH_STORAGE_KEY = 'tasks-app.auth';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  
  private apiUrl = 'https://backend-app-web-camisetas.onrender.com/api/auth';

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly storage = inject(LocalStorageServices);

  private readonly sessionSignal = signal<AuthSession | null>(null);
  readonly session = this.sessionSignal.asReadonly(); 

  constructor() {
    const restored = this.restoreSession();
    if (restored) {
      this.sessionSignal.set(restored);
    }
  }

  isLoggedIn(): boolean {
    return !!this.sessionSignal();
  }

  getCurrentUser(): SessionUser | null {
    return this.sessionSignal()?.user ?? null;
  }

  getAccessToken(): string | null {
    return this.sessionSignal()?.accessToken ?? null;
  }

  async login(payload: LoginPayload): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<LoginResponse>(
        `${this.apiUrl}/login`,
        payload,
        { withCredentials: true }
      )
    );

    const session: AuthSession = {
      accessToken: response.accessToken,
      user: response.user
    }

    this.persistSession(session);
  }

  async logout(): Promise<void> {
    await firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/logout`, {}, { withCredentials: true })
    )
    this.clearSession();
    this.router.navigate(['/login']); 
  }

  private clearSession(): void {
    this.sessionSignal.set(null);
    this.storage.remove(AUTH_STORAGE_KEY);
  }

  persistSession(session: AuthSession) {
    this.sessionSignal.set(session);
    this.storage.write(AUTH_STORAGE_KEY, session);
  }

  private restoreSession(): AuthSession | null {
    const stored = this.storage.read<AuthSession>(AUTH_STORAGE_KEY);
    if (!stored) {
      return null;
    }

    if (stored?.accessToken && stored?.user?.email) {
      return stored;
    }

    this.storage.remove(AUTH_STORAGE_KEY);
    return null;
  }
  
  async refreshToken(): Promise<void> {
    return await firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/refresh`, {}, { withCredentials: true })
    );
  }

  saveAccessToken(token: string) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    const session: AuthSession = {
      accessToken: token,
      user: currentUser
    }
    
    this.persistSession(session);
  }

}

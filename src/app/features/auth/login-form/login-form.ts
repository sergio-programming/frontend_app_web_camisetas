import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from '../../../core/services/auth-services';
import { LoginPayload } from '../auth.model';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {

  private readonly authServices = inject(AuthServices);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly message = signal<string | null>(null);

  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onLogin(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload = this.loginForm.value as LoginPayload;

    try {
      await this.authServices.login(payload);
      const role = this.authServices.getCurrentUser()?.role;
      const target = role === 'admin' ? '/admin' : '/editor';
      this.router.navigate([target]);
    } catch (error) {
      console.error('Error al iniciar sesión: ', error);
      this.message.set('Credenciales inválidas');
    }
  }

}

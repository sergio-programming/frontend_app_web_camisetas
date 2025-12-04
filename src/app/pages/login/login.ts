import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from '../../services/auth-services';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm: FormGroup;
  
  invalidFormMessage: string = '';
  messageCredentialsError: string = '';

  constructor(
    private authServices: AuthServices,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(): void{
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.invalidFormMessage = 'Debes completar los campos correctamente';
      return
    }

    const { email, password } = this.loginForm.value;

    this.authServices.login({ email, password }).subscribe({
      next: () => {
        this.invalidFormMessage = '';
        this.messageCredentialsError = '';
        this.router.navigate(['/home-admin']);
      }, error: (err) => {
        console.error('Error al iniciar sesión: ', err);
        this.messageCredentialsError = 'Error al ingresar las credenciales';
        this.invalidFormMessage = '';
      }
    });
  }


}

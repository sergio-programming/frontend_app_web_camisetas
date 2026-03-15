import { Component } from '@angular/core';
import { LoginForm } from '../../features/auth/login-form/login-form';

@Component({
  selector: 'app-auth-layout',
  imports: [LoginForm],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {

}

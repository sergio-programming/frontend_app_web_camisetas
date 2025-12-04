import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthServices } from '../../services/auth-services';

@Component({
  selector: 'app-header-component',
  imports: [RouterModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {

  constructor(
    private authServices: AuthServices,
    private router: Router
  ) {}

  logout(): void {
    this.authServices.logout().subscribe({
      next: () => {
        this.router.navigate(['/login'])
      }, error: (err) => {
        console.error('Error al cerrar sesión: ', err);
        
      }
    })
  }

}

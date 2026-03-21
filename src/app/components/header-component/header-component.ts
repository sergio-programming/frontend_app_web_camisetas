import { Component, inject} from '@angular/core';
import { Router, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { AuthServices } from '../../core/services/auth-services';

@Component({
  selector: 'app-header-component',
  imports: [RouterLinkActive, RouterLinkWithHref],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  private readonly authServices = inject(AuthServices);
  private readonly router = inject(Router);

  readonly user = this.authServices.session()?.user;


  // Usamos una función para obtener links basada en el estado actual del signal
  get links() {
    if (!this.user) return []; // Retorno seguro si no hay usuario

    if (this.user.role === 'admin') {
      return [
        { label: 'Dashboard', path: '/admin/dashboard', icon: 'fas fa-terminal' },
        { label: 'Usuarios', path: '/admin/user-management', icon: 'fas fa-users-gear' },
        { label: 'Productos', path: '/admin/products', icon: 'fas fa-boxes-stacked' }
      ];
    }

    if (this.user.role === 'editor') {
      return [
        { label: 'Dashboard', path: '/editor/dashboard', icon: 'fas fa-gauge-high' },
        { label: 'Productos', path: '/editor/products', icon: 'fas fa-pen-to-square' }
      ];
    }

    return [
      { label: 'Inicio', path: '/', icon: 'fas fa-house' },
      { label: 'Camisetas', path: '/shirts', icon: 'fas fa-shirt' },
      { label: 'Álbumes', path: '/albums', icon: 'fas fa-compact-disc' }
    ];
  }

  async onLogout(): Promise<void> {
    try {
      await this.authServices.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error crítico al cerrar sesión: ', error);
    }
  }
}

import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { AuthServices } from '../../core/services/auth-services';
import { SessionUser } from '../../features/users/user.model';

@Component({
  selector: 'app-header-component',
  imports: [RouterLinkActive, RouterLinkWithHref],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent implements OnInit {
  private readonly authServices = inject(AuthServices);
  private readonly router = inject(Router);

  readonly user = signal<SessionUser | null>(null);

  ngOnInit(): void {
    const data = this.authServices.getCurrentUser();
    this.user.set(data);
  }

  // Usamos una función para obtener links basada en el estado actual del signal
  get links() {
    const currentUser = this.user();
    if (!currentUser) return []; // Retorno seguro si no hay usuario

    const role = currentUser.role;

    if (role === 'admin') {
      return [
        { label: 'Dashboard', path: '/admin/dashboard', icon: 'fas fa-terminal' },
        { label: 'Usuarios', path: '/admin/user-management', icon: 'fas fa-users-gear' },
        { label: 'Productos', path: '/admin/products', icon: 'fas fa-boxes-stacked' }
      ];
    }

    if (role === 'editor') {
      return [
        { label: 'Dashboard', path: '/editor/dashboard', icon: 'fas fa-gauge-high' },
        { label: 'Productos', path: '/editor/productos', icon: 'fas fa-pen-to-square' }
      ];
    }

    return [
      { label: 'Inicio', path: '/home', icon: 'fas fa-house' },
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
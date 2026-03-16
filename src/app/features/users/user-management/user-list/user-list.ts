import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserServices } from '../../../../core/services/user-services';
import { User } from '../../user.model';
import { AuthServices } from '../../../../core/services/auth-services';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {

  private readonly userServices = inject(UserServices);
  private readonly authServices = inject(AuthServices);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  users: User[] | [] = [];
  readonly currentUserEmail = this.authServices.getCurrentUser()?.email;

  readonly isLoading = signal<boolean>(false);
  readonly message = signal<string>('');

  ngOnInit(): void {
    this.loadUsers();    
  }

  async loadUsers(): Promise<void> {
    this.isLoading.set(true);
    this.message.set('');

    try {
      const data = await this.userServices.getUsers();
      this.users = data ?? [];
      if (this.users.length === 0) {
        this.message.set('No hay usuarios registrados actualmente');
      }
    } catch (error: any) {
      console.error('Error crítico al cargar los usuarios: ', error);
      this.message.set(error.error?.message || 'Error de conexión al servidor');
    } finally {
      this.isLoading.set(false);
    }
  }

  async onDeleteUser(_id: string): Promise<void> {
    if(confirm('¿Estas seguro de eliminar este usuario?')) {
      this.isLoading.set(true);
      try {
        const response = await this.userServices.deleteUser(_id);
        this.message.set(response.message);
        await this.loadUsers();
      } catch (error: any) {
        console.error('Error crítico al eliminar el usuario: ', error);
        this.message.set(error.error?.message || 'Error de conexión al servidor');
      } finally {
        this.isLoading.set(false);
      }
    }
  }

  onRedirectCreateUserForm(): void {
    this.userServices.setUserToEdit(null);
    this.router.navigate(['./crear'], { relativeTo: this.route });
  }

  onRedirectUpdateUserForm(user: User): void {
    this.userServices.setUserToEdit(user);
    this.router.navigate(['./editar', user._id], { relativeTo: this.route });
  }

  async onCancelUser(_id: string): Promise<void> {
    if (confirm('¿Estas seguro de cancelar este usuario?')) {
      this.isLoading.set(true);
      try {
        const response = await this.userServices.cancelUser(_id);
        this.message.set(response.message);
        await this.loadUsers();
      } catch (error: any) {
        console.error('Error crítico al cancelar el usuario: ', error);
        this.message.set(error.error?.message || 'Error de conexión al servidor');
      } finally {
        this.isLoading.set(false);
      }
    }
  }

  async onActivateUser(_id: string): Promise<void> {
    if (confirm('¿Estas seguro de activar este usuario?')) {
      this.isLoading.set(true);
      try {
        const response = await this.userServices.activateUser(_id);
        this.message.set(response.message);
        await this.loadUsers();
      } catch (error: any) {
        console.error('Error crítico al activar el usuario: ', error);
        this.message.set(error.error?.message || 'Error de conexión al servidor');
      } finally {
        this.isLoading.set(false);
      }
    }
  }

}

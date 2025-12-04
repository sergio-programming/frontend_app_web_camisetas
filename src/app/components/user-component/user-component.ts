import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserFormComponent } from '../create-user-form-component/create-user-form-component';
import { UpdateUserFormComponent } from '../update-user-form-component/update-user-form-component';
import { UserServices, User } from '../../services/user-services';

@Component({
  selector: 'app-user-component',
  imports: [CommonModule, CreateUserFormComponent, UpdateUserFormComponent],
  templateUrl: './user-component.html',
  styleUrl: './user-component.css',
})
export class UserComponent implements OnInit {

  users: User[] = [];

  selectedUser: any = null;

  getCreateForm: boolean = false;
  getUpdateForm: boolean = false;

  successMessage: string = '';
  errorMessage: string = '';

  constructor (
    private userServices: UserServices
  ) {}

  ngOnInit(): void {
    this.onGetUsers();
  }

  onGetUsers(): void {
    this.userServices.getUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Error al mostrar los usuarios: ', err)
    })
  }

  refreshUsers(): void {
    this.onGetUsers();
  }

  submitDeleteUser(_id: string) {
    if (confirm('¿Estas seguro de eliminar este usuario?')) {
      this.userServices.deleteUser(_id).subscribe({
        next: (res) => {
          this.successMessage = res.message;
          this.errorMessage = '';
          this.onGetUsers();
        }, error: (err) => {
          console.error('Error al eliminar el usuario: ', err);          
          this.errorMessage = 'Error al eliminar el usuario';
          this.successMessage = '';
        }
      })
    }
  }

  onGetCreateForm() {
    this.getCreateForm = !this.getCreateForm;
    this.getUpdateForm = false;
  }

  onGetUpdateForm(user: User) {
    this.selectedUser = user;
    this.getUpdateForm = !this.getUpdateForm;
    this.getCreateForm = false;
  }

}

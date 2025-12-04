import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserServices, UserCreate } from '../../services/user-services';


@Component({
  selector: 'app-create-user-form-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-user-form-component.html',
  styleUrl: './create-user-form-component.css',
})
export class CreateUserFormComponent {

  @Output() userCreated = new EventEmitter<void>();

  userCreateForm: FormGroup;

  successMessage: string = "";
  errorMessage: string = "";
  invalidFormMessage: string = "";

  constructor(
    private userServices: UserServices,
    private fb: FormBuilder
  ) {
    this.userCreateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required, Validators.pattern(/^(superadmin|admin)$/)]]
    })
  }

  submitCreateUser() {
    if (this.userCreateForm.invalid) {
      this.userCreateForm.markAllAsTouched();
      this.invalidFormMessage = 'Debes completar los campos correctamente';
      return;
    }

    const newUser = this.userCreateForm.value as UserCreate;

    this.userServices.createUser(newUser).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.errorMessage = '';
        this.invalidFormMessage = '';
        this.userCreateForm.reset();

        this.userCreated.emit();

      }, error: (err) => {
        console.error('Error al crear el usuario: ', err);
        this.errorMessage = 'Error al crear el usuario';
        this.successMessage = '';
      } 
    })
  }

}

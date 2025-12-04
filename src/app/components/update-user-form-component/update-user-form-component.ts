import { Component, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserServices } from '../../services/user-services';

@Component({
  selector: 'app-update-user-form-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-user-form-component.html',
  styleUrl: './update-user-form-component.css',
})
export class UpdateUserFormComponent {

  @Input() userToUpdate: any;
  @Output() userUpdated = new EventEmitter<void>();  

  userUpdateForm: FormGroup;

  successMessage: string = "";
  errorMessage: string = "";
  invalidFormMessage: string = "";

  constructor(
    private userServices: UserServices,
    private fb: FormBuilder
  ) {
    this.userUpdateForm = this.fb.group({
      email: ['', [Validators.email]],
      nombre: ['', [Validators.minLength(3)]],
      role: ['', [Validators.pattern(/^(superadmin|admin)$/)]],
      activo: ['']
    })
  }

  ngOnChanges() {
    if (this.userToUpdate) {
      this.userUpdateForm.patchValue({
        email: this.userToUpdate.email,
        nombre: this.userToUpdate.nombre,
        role: this.userToUpdate.role,
        activo: this.userToUpdate.activo
      });
    }
  }

  submitUpdateUser() {
    if (this.userUpdateForm.invalid) {
      this.userUpdateForm.markAllAsTouched();
      this.invalidFormMessage = 'Debes completar los campos correctamente';
      return;
    }

    const updatedUser = this.userUpdateForm.value;

    this.userServices.updateUser(this.userToUpdate._id, updatedUser).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.errorMessage = '';
        this.invalidFormMessage = '';
        this.userUpdateForm.reset();
        this.userUpdated.emit();

      }, error: (err) => {
        console.error('Error al actualizar el usuario: ', err);
        this.errorMessage = 'Error al actualizar el usuario';
        this.successMessage = '';
      } 
    });
  }

}

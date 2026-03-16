import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServices } from '../../../../core/services/user-services';
import { AuthServices } from '../../../../core/services/auth-services';
import { User, UserCreate, UserUpdate, UserRoles } from '../../user.model';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm implements OnInit {

  private readonly userServices = inject(UserServices);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly userToEdit = signal<User | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly message = signal({ text: '', type: '' });

  readonly RoleOptions = ['admin', 'editor'];

  readonly userForm = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['', [Validators.required]]
  })

  async ngOnInit(): Promise<void> {
    let data = this.userServices.getUserToEdit();

    const id = this.route.snapshot.paramMap.get('id');

    if (!data && id) {
      try {
        this.isLoading.set(true);
        data = await this.userServices.getUser(id);
      } catch (error) {
        this.message.set({ text: 'No se encontro el usuario', type: 'error' });
        return;
      } finally {
        this.isLoading.set(false);
      }
    }

    if (data) {
      this.userToEdit.set(data);
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();

      this.userForm.patchValue({
        fullName: data.fullName,
        email: data.email,
        role: data.role
      });
    }
  }

  async onSubmit(): Promise<void> {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    try {
      if (this.userToEdit()) {
        const { password, ...data } = this.userForm.getRawValue();
        const updatedData: UserUpdate = data;
        const res = await this.userServices.updateUser(this.userToEdit()!._id, updatedData);
        this.message.set({ text: res.message, type: 'success' });
      } else {
        const createdData = this.userForm.getRawValue() as UserCreate;
        const res = await this.userServices.createUser(createdData);
        this.message.set({ text: res.message, type: 'success' });
      }
      setTimeout(() => this.router.navigate(['/admin/user-management']), 2000);
    } catch (error: any) {
      this.message.set({ 
        text: error.error?.message || 'Ocurrió un error inesperado', 
        type: 'error' 
      });
    } finally {
      this.isLoading.set(false);
    }
  }

  onCancel() {
    this.router.navigate(['/admin/user-management']);
  }

}

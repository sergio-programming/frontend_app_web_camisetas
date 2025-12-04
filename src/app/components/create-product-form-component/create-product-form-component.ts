import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductServices, ProductCreate } from '../../services/product-services';

@Component({
  selector: 'app-create-product-form-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-product-form-component.html',
  styleUrl: './create-product-form-component.css',
})
export class CreateProductFormComponent {

  @Output() productCreated = new EventEmitter<void>();

  productCreateForm: FormGroup;

  successMessage: string = "";
  errorMessage: string = "";
  invalidFormMessage: string = "";

  constructor(
    private productServices: ProductServices,
    private fb: FormBuilder
  ) {
    this.productCreateForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(6)]],
      descripcion: ['', [Validators.required, Validators.maxLength(100)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', [Validators.required, Validators.pattern(/^(Camisetas|Discos)$/)]],
      imagen: ['', [Validators.required]]
    })
  }

  submitCreateProduct() {
    if (this.productCreateForm.invalid) {
      this.productCreateForm.markAllAsTouched();
      this.invalidFormMessage = 'Debes completar los campos correctamente';
      return;
    }

    const newProduct = this.productCreateForm.value as ProductCreate;

    this.productServices.createProduct(newProduct).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.errorMessage = '';
        this.invalidFormMessage = '';
        this.productCreateForm.reset();

        this.productCreated.emit();

      }, error: (err) => {
        console.error('Error al crear el producto: ', err);
        this.errorMessage = 'Error al crear el producto';
        this.successMessage = '';
      } 
    })
  }



}

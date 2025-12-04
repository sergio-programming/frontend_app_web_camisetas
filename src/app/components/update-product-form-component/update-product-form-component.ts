import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductServices } from '../../services/product-services';

@Component({
  selector: 'app-update-product-form-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-product-form-component.html',
  styleUrl: './update-product-form-component.css',
})
export class UpdateProductFormComponent {

  @Input() productToUpdate: any;
  @Output() productUpdated = new EventEmitter<void>();  

  productUpdateForm: FormGroup;

  successMessage: string = "";
  errorMessage: string = "";
  invalidFormMessage: string = "";

  constructor(
    private productServices: ProductServices,
    private fb: FormBuilder
  ) {
    this.productUpdateForm = this.fb.group({
      codigo: ['', [Validators.minLength(6)]],
      descripcion: ['', [Validators.maxLength(100)]],
      precio: [0, [Validators.min(0)]],
      categoria: ['', [Validators.pattern(/^(Camisetas|Discos)$/)]],
      imagen: ['']
    })
  }

  ngOnChanges() {
    if (this.productToUpdate) {
      this.productUpdateForm.patchValue({
        codigo: this.productToUpdate.codigo,
        descripcion: this.productToUpdate.descripcion,
        precio: this.productToUpdate.precio,
        categoria: this.productToUpdate.categoria,
        imagen: this.productToUpdate.imagen
      });
    }
  }

  submitUpdateProduct() {
    if (this.productUpdateForm.invalid) {
      this.productUpdateForm.markAllAsTouched();
      this.invalidFormMessage = 'Debes completar los campos correctamente';
      return;
    }

    const updatedProduct = this.productUpdateForm.value;

    this.productServices.updateProduct(this.productToUpdate._id, updatedProduct).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.errorMessage = '';
        this.invalidFormMessage = '';
        this.productUpdateForm.reset();
        this.productUpdated.emit();

      }, error: (err) => {
        console.error('Error al actualizar el producto: ', err);
        this.errorMessage = 'Error al actualizar el producto';
        this.successMessage = '';
      } 
    });
  }

}

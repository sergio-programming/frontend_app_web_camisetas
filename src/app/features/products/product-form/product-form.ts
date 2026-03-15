import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductServices } from '../../../core/services/product-services';
import { AuthServices } from '../../../core/services/auth-services';
import { Product, ProductCreate, ProductUpdate } from '../product.model';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit {

  private readonly productServices = inject(ProductServices);
  private readonly authServices = inject(AuthServices);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly productToEdit = signal<Product | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly message = signal({ text: '', type: '' });

  readonly CategoriesOptions = ["Camisetas", "Discos"];

  readonly productForm = this.fb.nonNullable.group({
    productCode: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}-\d{4}$/)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    price: [0, [Validators.required, Validators.min(0)]],
    category: ['', [Validators.required, Validators.pattern(/^(Camisetas|Discos)$/)]],
    image: ['', Validators.required]
  });

  async ngOnInit(): Promise<void> {
    let data = this.productServices.getProductToEdit();

    const id = this.route.snapshot.paramMap.get('id');

    if (!data && id) {
      try {
        this.isLoading.set(true);
        data = await this.productServices.getProduct(id);
      } catch (error) {
        this.message.set({ text: 'No se encontro la tarea', type: 'error' });
        return;
      } finally {
        this.isLoading.set(false);
      }

      if (data) {
        this.productToEdit.set(data);
        this.productForm.patchValue({
          productCode: data.productCode,
          description: data.description,
          price: data.price,
          category: data.category,
          image: data.image          
        });
      }

    }      
  }

  async onSubmit(): Promise<void> {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.message.set({ text: '', type: '' });

    try {
      if (this.productToEdit()){
        const productToUpdate = this.productForm.value as ProductUpdate;
        const res = await this.productServices.updateProduct(this.productToEdit()!._id, productToUpdate);
        this.message.set({ text: res.message, type: 'success' });
      } else {
        const productToCreate = this.productForm.value as ProductCreate;
        const res = await this.productServices.createProduct(productToCreate);
        this.message.set({ text: res.message, type: 'success' });
      }
      const role = this.authServices.getCurrentUser()?.role;
      const basePath = role === 'admin' ? '/admin/products' : '/editor/products';
      setTimeout(() => this.router.navigate([basePath]), 2000);
    } catch (error: any) {
      console.error('Error critico inesperado: ', error);
      this.message.set({
        text: error.error?.message || 'Error de conexión al servidor',
        type: 'error'
      });
    } finally {
      this.isLoading.set(false);
    }
  }

  onCancel(): void {
    const role = this.authServices.getCurrentUser()?.role;
    const basePath = role === 'admin' ? '/admin/products' : '/editor/products';
    this.router.navigate([basePath]);
  }


}

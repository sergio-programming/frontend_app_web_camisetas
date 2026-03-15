import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductServices } from '../../../core/services/product-services';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {

  private readonly productServices = inject(ProductServices);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  products: Product[] | [] = []; 

  readonly isLoading = signal<boolean>(false);
  readonly message = signal<string>('');

  ngOnInit(): void {
    this.loadProducts();
    
  }

  async loadProducts(): Promise<void> {
    this.isLoading.set(true);
    this.message.set('');
    try {
      const data = await this.productServices.getProducts();
      this.products = data ?? [];
      if (this.products.length === 0) {
        this.message.set('No hay productos registrados actualmente');
      }
    } catch (error: any) {
      console.error('Error crítico al cargar los productos: ', error);
      this.message.set(error.error?.message || 'Error de conexión al servidor');            
    } finally {
      this.isLoading.set(false);
    }
  }
  
  async onDeleteProduct(_id: string): Promise<void> {
    if (confirm('¿Estas seguro de eliminar este producto?')) {
      this.isLoading.set(true);
      try {
        const response = await this.productServices.deleteProduct(_id);
        this.message.set(response.message);
        await this.loadProducts();
      } catch (error: any) {
        console.error('Error crítico al eliminar el producto: ', error);
        this.message.set(error.error?.message || 'Error de conexión al servidor');
      } finally {
        this.isLoading.set(false);
      }
    }
  }

  onRedirectCreateProductForm(): void {
    this.productServices.setProductToEdit(null);
    this.router.navigate(['./crear'], { relativeTo: this.route });
  }

  onRedirectUpdateProductForm(product: Product ): void {
    this.productServices.setProductToEdit(product);
    this.router.navigate(['./editar', product._id], { relativeTo: this.route });
  }

}

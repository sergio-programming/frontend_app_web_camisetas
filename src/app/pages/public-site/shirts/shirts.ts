import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductServices } from '../../../core/services/product-services';
import { Product } from '../../../features/products/product.model';

@Component({
  selector: 'app-shirts',
  imports: [CommonModule],
  templateUrl: './shirts.html',
  styleUrl: './shirts.css',
})
export class Shirts implements OnInit {

  private readonly productServices = inject(ProductServices);

  shirts: Product[] | [] = [];

  readonly isLoading = signal<boolean>(false);
  readonly message = signal<string | null>('');

  ngOnInit(): void {
    this.loadShirts();
  }

  async loadShirts(): Promise<void> {
    this.isLoading.set(true);
    this.message.set('');

    try {
      const data = await this.productServices.getProductsByCategory('Camisetas');
      this.shirts = data ?? [];
      if (this.shirts.length === 0) {
        this.message.set('No hay camisetas disponibles actualmente');
      }
    } catch (error: any) {
      console.error('Error crítico al cargar las camisetas: ', error);
      this.message.set(error.error?.message || 'Error de conexión al servidor');
    } finally {
      this.isLoading.set(false);
    }
  } 

}

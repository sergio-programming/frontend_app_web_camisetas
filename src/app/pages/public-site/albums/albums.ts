import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductServices } from '../../../core/services/product-services';
import { Product } from '../../../features/products/product.model';

@Component({
  selector: 'app-albums',
  imports: [CommonModule],
  templateUrl: './albums.html',
  styleUrl: './albums.css',
})
export class Albums implements OnInit {

  private readonly productServices = inject(ProductServices);

  albums: Product[] | [] = [];

  readonly isLoading = signal<boolean>(false);
  readonly message = signal<string | null>('');

  ngOnInit(): void {
    this.loadAlbums();
  }

  async loadAlbums(): Promise<void> {
    this.isLoading.set(true);
    this.message.set('');
    try {
      const data = await this.productServices.getProductsByCategory('Discos');
      this.albums = data ?? [];
      if (this.albums.length === 0) {
        this.message.set('No hay discos disponibles actualmente');
      }
    } catch (error: any) {
      console.error('Error crítico al cargar los discos: ', error);
      this.message.set(error.error?.message || 'Error de conexión al servidor');
    } finally {
      this.isLoading.set(false);
    }
  }


}

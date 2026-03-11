import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductCreate, ProductUpdate, ProductResponse } from '../../features/products/product.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {

  private apiUrl = 'https://backend-app-web-camisetas.onrender.com/api/products';

  private readonly http = inject(HttpClient);

  async getProducts(): Promise<Product[]> {
      return await firstValueFrom(
        this.http.get<Product[]>(this.apiUrl)
      ); 
    }
  
  async getProduct(_id: string): Promise<Product> {
    return await firstValueFrom(
      this.http.get<Product>(`${this.apiUrl}/${_id}`)
    ); 
  }

  async getShirts(category: string = 'Camisetas'): Promise<Product[]> {
    return await firstValueFrom(
      this.http.get<Product[]>(`${this.apiUrl}/category/${category}`)
    ); 
  }

  async getAlbums(category: string = 'Discos'): Promise<Product[]> {
    return await firstValueFrom(
      this.http.get<Product[]>(`${this.apiUrl}/category/${category}`)
    ); 
  }

  async createProduct(user: ProductCreate): Promise<ProductResponse> {
    return await firstValueFrom(
      this.http.post<ProductResponse>(this.apiUrl, user)
    );
  }

  async updateProduct(_id: string, product: ProductUpdate): Promise<ProductResponse> {
    return await firstValueFrom(
      this.http.put<ProductResponse>(`${this.apiUrl}/${_id}`, product)
    ); 
  }

  async deleteProduct(_id: string): Promise<ProductResponse> {
    return await firstValueFrom(
      this.http.delete<ProductResponse>(`${this.apiUrl}/${_id}`)
    ); 
  }
  
}

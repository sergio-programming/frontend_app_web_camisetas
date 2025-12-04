import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  _id: string;
  codigo: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductResponse {
  message: string;
  product: Product;
}

export interface ProductCreate {
  codigo: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
}


@Injectable({
  providedIn: 'root',
})
export class ProductServices {

  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(this.apiUrl);
    }
  
  getProductById(_id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${_id}`);
  }

  getShirts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/shirts`);
  }

  getAlbums(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/albums`);
  }

  createProduct(user: ProductCreate): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.apiUrl, user)
  }

  updateProduct(_id: string, product: Partial<Product>): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(`${this.apiUrl}/${_id}`, product);
  }

  deleteProduct(_id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${_id}`);
  }
  
}

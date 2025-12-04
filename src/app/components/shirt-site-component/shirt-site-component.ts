import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductServices, Product } from '../../services/product-services';

@Component({
  selector: 'app-shirt-site-component',
  imports: [CommonModule],
  templateUrl: './shirt-site-component.html',
  styleUrl: './shirt-site-component.css',
})
export class ShirtSiteComponent implements OnInit {

  shirts: Product[] = [];

  constructor(private productServices: ProductServices) {}

  ngOnInit(): void{
    this.loadShirts();
  }

  loadShirts(): void{
    this.productServices.getShirts().subscribe({
      next: (data) => (this.shirts = data),
      error: (err) => console.error('Error al mostrar los camisetas: ', err) 
    });
  }

}

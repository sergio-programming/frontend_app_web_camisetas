import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductServices, Product } from '../../services/product-services';

@Component({
  selector: 'app-home-site-component',
  imports: [CommonModule],
  templateUrl: './home-site-component.html',
  styleUrl: './home-site-component.css',
})
export class HomeSiteComponent implements OnInit {

  featuredProducts: Product[] = [];

  constructor(
    private router: Router,
    private productServices: ProductServices
  ) {}

  ngOnInit(): void {
      this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void{
    this.productServices.getProducts().subscribe({
      next:(products) => {
        this.featuredProducts = products.slice(0, 3);
      },
      error: (err) => console.error('Error al cargar los productos destacados: ', err)
    });
  }

  goToShirtsSection() {
    this.router.navigate(['/home/shirts']);
  }

  goToAlbumsSection() {
    this.router.navigate(['/home/albums']);
  }

}

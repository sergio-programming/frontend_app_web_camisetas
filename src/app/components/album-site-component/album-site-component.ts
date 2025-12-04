import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductServices, Product } from '../../services/product-services';

@Component({
  selector: 'app-album-site-component',
  imports: [CommonModule],
  templateUrl: './album-site-component.html',
  styleUrl: './album-site-component.css',
})
export class AlbumSiteComponent {

  albums: Product[] = [];

  constructor(private productServices: ProductServices) {}

  ngOnInit(): void{
    this.loadAlbums();
  }

  loadAlbums(): void{
    this.productServices.getAlbums().subscribe({
      next: (data) => (this.albums = data),
      error: (err) => console.error('Error al mostrar los camisetas: ', err) 
    });
  }
  
}

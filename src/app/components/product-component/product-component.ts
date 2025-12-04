import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductFormComponent } from '../create-product-form-component/create-product-form-component';
import { UpdateProductFormComponent } from '../update-product-form-component/update-product-form-component';
import { ProductServices, Product } from '../../services/product-services';


@Component({
  selector: 'app-product-component',
  imports: [CommonModule, CreateProductFormComponent, UpdateProductFormComponent],
  templateUrl: './product-component.html',
  styleUrl: './product-component.css',
})
export class ProductComponent {

  products: Product[] = [];

  selectedProduct: any = null;

  getCreateForm: boolean = false;
  getUpdateForm: boolean = false;

  successMessage: string = '';
  errorMessage: string = '';

  constructor (
    private productServices: ProductServices
  ) {}

  ngOnInit(): void {
    this.onGetProducts();
  }

  onGetProducts(): void {
    this.productServices.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Error al mostrar los productos: ', err)
    })
  }

  refreshProducts(): void {
    this.onGetProducts();
  }

  submitDeleteProduct(_id: string) {
    if (confirm('¿Estas seguro de eliminar este producto?')) {
      this.productServices.deleteProduct(_id).subscribe({
        next: (res) => {
          this.successMessage = res.message;
          this.errorMessage = '';
          this.onGetProducts();
        }, error: (err) => {
          console.error('Error al eliminar el producto: ', err);          
          this.errorMessage = 'Error al eliminar el producto';
          this.successMessage = '';
        }
      })
    }
  }

  onGetCreateForm() {
    this.getCreateForm = !this.getCreateForm;
    this.getUpdateForm = false;
  }

  onGetUpdateForm(product: Product) {
    this.selectedProduct = product;
    this.getUpdateForm = !this.getUpdateForm;
    this.getCreateForm = false;
  }

}

export type ProductCategories = 'Camisetas' | 'Discos';

export interface Product {
    _id: string;
    productCode: string;
    description: string;
    price: number;
    category: ProductCategories;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProductCreate {
    productCode: string;
    description: string;
    price: number;
    category: ProductCategories;
    image: string;
}

export interface ProductUpdate extends ProductCreate {}

export interface ProductResponse {
    message: string;
    product: Product;
}
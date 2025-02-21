import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './product.interface';
@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductsRepository) {}

  getProducts(page: number, limit: number) {
    return this.productRepository.getProducts(+page, +limit);
  }
  getProductById(id: number) {
    return this.productRepository.getById(id);
  }
  createProduct(product: Omit<Product, 'id'>): Product {
    return this.productRepository.createProduct(product);
  }
  modifiedProduct(id: number, product: Partial<Product>) {
    return this.productRepository.modifiedProduct(id, product);
  }
  deleteProduct(id: number) {
    return this.productRepository.deleteProduct(id);
  }
}

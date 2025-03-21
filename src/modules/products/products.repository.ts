// import { Injectable } from '@nestjs/common';
// import { Product } from './product.interface';
// @Injectable()
// export class ProductsRepository {
//   products = [
//     {
//       id: 1,
//       name: 'Laptop Gamer',
//       description: 'Laptop de alto rendimiento para juegos',
//       price: 1500,
//       stock: true,
//       imgUrl: 'https://example.com/laptop.jpg',
//     },
//     {
//       id: 2,
//       name: 'Smartphone',
//       description: 'Teléfono inteligente con gran cámara',
//       price: 800,
//       stock: true,
//       imgUrl: 'https://example.com/smartphone.jpg',
//     },
//     {
//       id: 3,
//       name: 'Auriculares Inalámbricos',
//       description: 'Auriculares Bluetooth con cancelación de ruido',
//       price: 200,
//       stock: true,
//       imgUrl: 'https://example.com/auriculares.jpg',
//     },
//     {
//       id: 4,
//       name: 'Monitor 4K',
//       description: 'Monitor de alta resolución con tecnología HDR',
//       price: 700,
//       stock: false,
//       imgUrl: 'https://example.com/monitor.jpg',
//     },
//     {
//       id: 5,
//       name: 'Teclado Mecánico',
//       description: 'Teclado con interruptores mecánicos y retroiluminación RGB',
//       price: 120,
//       stock: true,
//       imgUrl: 'https://example.com/teclado.jpg',
//     },
//     {
//       id: 6,
//       name: 'Mouse Gamer',
//       description: 'Mouse con sensor óptico de alta precisión',
//       price: 90,
//       stock: true,
//       imgUrl: 'https://example.com/mouse.jpg',
//     },
//     {
//       id: 7,
//       name: 'Silla Ergonómica',
//       description: 'Silla de oficina cómoda y ajustable',
//       price: 350,
//       stock: true,
//       imgUrl: 'https://example.com/silla.jpg',
//     },
//     {
//       id: 8,
//       name: 'Disco SSD 1TB',
//       description: 'Almacenamiento sólido de alto rendimiento',
//       price: 250,
//       stock: false,
//       imgUrl: 'https://example.com/ssd.jpg',
//     },
//     {
//       id: 9,
//       name: 'Smartwatch',
//       description: 'Reloj inteligente con monitoreo de actividad física',
//       price: 300,
//       stock: true,
//       imgUrl: 'https://example.com/smartwatch.jpg',
//     },
//     {
//       id: 10,
//       name: 'Tablet',
//       description: 'Tablet con pantalla de alta resolución y gran autonomía',
//       price: 600,
//       stock: true,
//       imgUrl: 'https://example.com/tablet.jpg',
//     },
//   ];
//   getProducts(page: number, limit: number) {
//     const definedPage = page;
//     const definedLimit = limit;
//     const startIndex = (definedPage - 1) * definedLimit;
//     const endIndex = startIndex + definedLimit;
//     const paginatedUsers = this.products.slice(startIndex, endIndex);
//     return paginatedUsers;
//   }
//   getById(id: number) {
//     return this.products.find((p) => p.id === id);
//   }
//   createProduct(product: Omit<Product, 'id'>): Product {
//     const id = this.products.length + 1;
//     this.products = [...this.products, { id, ...product }];
//     return { id, ...product };
//   }
//   modifiedProduct(id: number, product: Partial<Product>) {
//     let modified = this.products.find((p) => id === p.id);
//     const index = this.products.findIndex((p) => id === p.id);
//     if (modified) {
//       modified = { ...modified, ...product };
//       this.products[index] = modified;
//       return this.products[index];
//     }
//     return null;
//   }
//   deleteProduct(id: number) {
//     const index = this.products.findIndex((u) => u.id === id);
//     const deleted = this.products[index];
//     if (index != -1) {
//       this.products.splice(index, 1);
//     }

//     return deleted;
//   }
// }
